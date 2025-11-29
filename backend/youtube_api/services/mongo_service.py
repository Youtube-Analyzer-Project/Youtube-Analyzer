from pymongo import MongoClient
from django.conf import settings

# MongoDB Configuration
MONGO_URI = settings.MONGO_URI
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["youtube_analyzer"]

# TO-DO -> every time save method is invoked, the previous data is deleted
def get_collection(name: str):
    return mongo_db[name]

def save_trending_videos(videos):
    collection = get_collection("view_videos")

    if videos:
        for video in videos:
            # Ensure each video has a unique _id field (using its 'id')
            video_doc = dict(video)
            if 'id' in video_doc:
                video_doc['_id'] = video_doc['id']
            collection.update_one({'_id': video_doc.get('_id')}, {'$set': video_doc}, upsert=True)
    return len(videos)

def get_view_videos(max_results=10):
    collection = get_collection("view_videos")
    return list(collection.find().limit(max_results))