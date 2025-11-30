import sys
import traceback
import nltk
import pymongo
from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, udf, collect_list, struct,
    current_timestamp, avg, count, explode
)
from pyspark.sql.types import FloatType
from nltk.sentiment.vader import SentimentIntensityAnalyzer


try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon')

analyzer = SentimentIntensityAnalyzer()


def translate_and_score(text):
    if not text:
        return 0.0

    try:
        score = analyzer.polarity_scores(text)['compound']
        return float(score)
    except Exception as e:
        print("Sentiment error:", e, file=sys.stderr)
        traceback.print_exc()
        return 0.0


def get_sentiment_label(score):
    if score <= -0.5:
        return "Very Negative"
    elif score <= -0.1:
        return "Negative"
    elif score < 0.1:
        return "Neutral"
    elif score < 0.5:
        return "Positive"
    else:
        return "Very Positive"


def find_highlights(comments_list):
    if not comments_list:
        return {"top_pos": [], "top_neg": []}

    sorted_comments = sorted(comments_list, key=lambda x: x['score'])

    top_neg = [c for c in sorted_comments if c['score'] < 0][:2]
    top_pos = [c for c in reversed(sorted_comments) if c['score'] > 0][:3]

    return {"top_pos": top_pos, "top_neg": top_neg}


def save_rich_data_mongo(partition_data):
    client = pymongo.MongoClient("mongodb://mongodb:27017/")
    db = client["youtube_analytics"]
    collection = db["videos"]

    for row in partition_data:
        video_id = (getattr(row, "video_id", None) or getattr(row, "v_id", None))

        if not video_id:
            continue

        current_score = float(row.avg_sentiment) if row.avg_sentiment is not None else 0.0
        highlights = find_highlights(row.all_comments)

        existing = collection.find_one({"_id": video_id})

        history = []
        last_score = 0.0

        if existing and "sentiment" in existing:
            history = existing["sentiment"].get("history", [])
            stored_score = existing["sentiment"].get("score")
            if stored_score is not None:
                last_score = float(stored_score)

        trend = "stable"
        if current_score > last_score + 0.1:
            trend = "increasing"
        elif current_score < last_score - 0.1:
            trend = "decreasing"

        history.append({
            "date": row.analysis_date.isoformat(),
            "score": current_score,
            "views": int(row.view_count) if row.view_count else 0
        })

        doc = {
            "_id": video_id,
            "title": row.title,
            "thumbnail_url": row.thumbnail_url,
            "channel_name": row.channel_name,
            "published_at": row.published_at,
            "category_id": row.category_id,
            "tags": row.tags if row.tags else [],
            "description": (row.description[:1000] + "...") if row.description else "",
            "stats": {
                "views": int(row.view_count) if row.view_count else 0,
                "likes": int(row.like_count) if row.like_count else 0,
                "comments": int(row.comment_count) if row.comment_count else 0
            },
            "sentiment": {
                "score": current_score,
                "label": get_sentiment_label(current_score),
                "trend": trend,
                "history": history
            },
            "highlights": {
                "top_positive": highlights['top_pos'],
                "top_negative": highlights['top_neg']
            },
            "last_updated": row.analysis_date
        }

        collection.replace_one({"_id": video_id}, doc, upsert=True)

    client.close()


def run_job():
    spark = SparkSession.builder \
        .appName("YouTubeRichAnalytics_FreeSentiment") \
        .config("spark.hadoop.fs.defaultFS", "hdfs://hadoop-namenode:8020") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")

    comments_raw = spark.read.json("hdfs://hadoop-namenode:8020/youtube/raw_spark/comments/*")

    comments_df = comments_raw.select(
        col("video_id"),
        explode("comments").alias("comment")
    )

    score_udf = udf(translate_and_score, FloatType())

    comments_scored = comments_df.filter(col("comment.text").isNotNull()) \
        .withColumn("score", score_udf(col("comment.text"))) \
        .select(
            col("video_id"),                            # 👈 KEEP video_id
            col("comment.author").alias("author"),
            col("comment.text").alias("text"),
            col("score")
        )

    videos_df = spark.read.json("hdfs://hadoop-namenode:8020/youtube/raw_spark/trending/*")

    videos_clean = videos_df.select(
        col("id").alias("v_id"),
        col("snippet.title").alias("title"),
        col("snippet.thumbnails.medium.url").alias("thumbnail_url"),
        col("snippet.channelTitle").alias("channel_name"),
        col("snippet.publishedAt").alias("published_at"),
        col("snippet.categoryId").alias("category_id"),
        col("snippet.description").alias("description"),
        col("snippet.tags").alias("tags"),
        col("statistics.viewCount").alias("view_count"),
        col("statistics.likeCount").alias("like_count")
    )

    comments_agg = comments_scored.groupBy("video_id").agg(
        avg("score").alias("avg_sentiment"),
        count("score").alias("comment_count"),
        collect_list(struct(
            col("author").alias("author"),
            col("text").alias("text"),
            col("score").alias("score")
        )).alias("all_comments")
    )

    final_df = videos_clean.join(
        comments_agg,
        videos_clean.v_id == comments_agg.video_id,
        "left"
    ).withColumn("analysis_date", current_timestamp())

    print("Saving rich video analytics to MongoDB...")
    final_df.foreachPartition(save_rich_data_mongo)

    print("Done!")
    spark.stop()


if __name__ == "__main__":
    run_job()
