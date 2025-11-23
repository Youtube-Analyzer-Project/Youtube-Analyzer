import requests
from pyspark.sql import SparkSession
import json
from datetime import datetime
import os

API_KEY = os.getenv("YOUTUBE_API_KEY")
if not API_KEY:
    raise RuntimeError("Missing YOUTUBE_API_KEY environment variable. Please set it before running this script.")

spark = SparkSession.builder \
    .appName("YouTubeSparkIngestion") \
    .config("spark.hadoop.fs.defaultFS", "hdfs://hadoop-namenode:8020") \
    .getOrCreate()

spark.sparkContext.setLogLevel("WARN")

# Fetch YouTube Data
url = "https://www.googleapis.com/youtube/v3/videos"
params = {
    "part": "snippet,statistics,contentDetails",
    "chart": "mostPopular",
    "regionCode": "RO",
    "maxResults": 50,
    "key": API_KEY
}

try:
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"Error fetching data from YouTube API: {e}")
    spark.stop()
    exit(1)
except ValueError as e:
    print(f"Error parsing JSON response: {e}")
    spark.stop()
    exit(1)

# Convert to RDD
json_str = json.dumps(data)
rdd = spark.sparkContext.parallelize([json_str])

# Output path with timestamp
timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
output_path = f"hdfs://hadoop-namenode:8020/youtube/raw_spark/trending/{timestamp}"

# Write to HDFS
rdd.coalesce(1).saveAsTextFile(output_path)
print(f"Saved to {output_path}")

spark.stop()
