import requests
from pyspark.sql import SparkSession
import json
from datetime import datetime


def fetch_video_comments(video_id):
    URL = f"http://backend:8000/api/fetch_comments/"
    params = {"video_id": video_id}
    response = requests.get(URL, params=params)
    data = response.json()
    comments = []
    for item in data:
        top = item["snippet"]["topLevelComment"]["snippet"]
        comments.append({
            "author": top["authorDisplayName"],
            "text": top["textDisplay"],
            "likeCount": top["likeCount"],
            "publishedAt": top["publishedAt"]
        })
    return comments


def store_in_hadoop(spark, filepath, items):
    rdd = spark.sparkContext.parallelize(items)

    json_rdd = rdd.map(lambda item: json.dumps(item))
    output_path = f"hdfs://hadoop-namenode:8020/youtube/raw_spark/{filepath}"
    json_rdd.coalesce(1).saveAsTextFile(output_path)
    print(f"Saved {len(items)} items to {output_path}")


def run_job():
    url = f"http://backend:8000/api/fetch_trending"
    response = requests.get(url)
    videos = response.json()
    spark = SparkSession.builder \
        .appName("YouTubeSparkIngestion") \
        .config("spark.hadoop.fs.defaultFS", "hdfs://hadoop-namenode:8020") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    store_in_hadoop(spark, f"trending/{timestamp}", videos)

    for video in videos:
        video_id = video["id"]
        comments = fetch_video_comments(video_id)
        wrapper = {
            "video_id": video_id,
            "comments": comments
        }
        print(f"Fetched {len(comments)} comments for {video_id}")
        store_in_hadoop(spark, f"comments/{video_id}_{timestamp}", [wrapper])

    spark.stop()

run_job()
