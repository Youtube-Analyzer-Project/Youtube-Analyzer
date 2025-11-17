from pymongo import MongoClient

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/youtube_analyzer"
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["youtube_analyzer"]

def get_collection(name: str):
    return mongo_db[name]

def save_trending_videos(videos):
    collection = get_collection("raw_videos")

    if videos:
        collection.insert_many(videos)
    return len(videos)

def get_raw_videos(max_results=10):
    collection = get_collection("raw_videos")
    return list(collection.find().limit(max_results))