import requests
from pyspark.sql import SparkSession
import json
from datetime import datetime
import os

def fetch_video_comments(video_id):
    API_KEY = os.getenv("YOUTUBE_API_KEY")
    params = {
        "part": "snippet",
        "videoId": video_id,
        "maxResults": 100,
        "order": "relevance",
        "key": API_KEY
    }
    URL = f"https://www.googleapis.com/youtube/v3/commentThreads"
    response = requests.get(URL, params=params)
    data = response.json()
    comments = []
    for item in data.get("items", []):
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

    # Convert each item to JSON string
    json_rdd = rdd.map(lambda item: json.dumps(item))
    # Output path with timestamp
    output_path = f"hdfs://hadoop-namenode:8020/youtube/raw_spark/{filepath}"
    # Write to HDFS
    json_rdd.coalesce(1).saveAsTextFile(output_path)
    print(f"Saved {len(items)} items to {output_path}")


def run_job():
    # make api call to backend: fetch/trending
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
        store_in_hadoop(spark, f"comments/{video_id}_{timestamp}", comments)

    spark.stop()

run_job()
