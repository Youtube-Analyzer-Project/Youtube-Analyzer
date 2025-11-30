import requests
from pyspark.sql import SparkSession
import json
from datetime import datetime

# make api call to backend: fetch/trending
url = f"http://backend:8000/api/fetch_trending"
response = requests.get(url)
items = response.json()
print(items)
spark = SparkSession.builder \
    .appName("YouTubeSparkIngestion") \
    .config("spark.hadoop.fs.defaultFS", "hdfs://hadoop-namenode:8020") \
    .getOrCreate()

spark.sparkContext.setLogLevel("WARN")
rdd = spark.sparkContext.parallelize(items)

# Convert each item to JSON string
json_rdd = rdd.map(lambda item: json.dumps(item))
# Output path with timestamp
timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
output_path = f"hdfs://hadoop-namenode:8020/youtube/raw_spark/trending/{timestamp}"

# Write to HDFS
json_rdd.coalesce(1).saveAsTextFile(output_path)
print(f"Saved to {output_path} {len(items)} videos")

spark.stop()
