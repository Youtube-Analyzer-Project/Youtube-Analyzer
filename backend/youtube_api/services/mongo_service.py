from pymongo import MongoClient
from django.conf import settings

# MongoDB Configuration
MONGO_URI = settings.MONGO_URI
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["youtube_analytics"]

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


def create_stats_view(video):
    if video:
        video['stats']['sentiment_label'] = video['sentiment']['label']
        video['stats']['sentiment_score'] = video['sentiment']['score']
        video.pop('sentiment', None)


def get_view_videos(skip, limit, search):
    collection = get_collection("videos")
    match = {}
    if search is not None:
        match = {
                "$or": [
                    {"title": {"$regex": search, "$options": "i"}},
                    {"channel_name": {"$regex": search, "$options": "i"}}
                ]
            }
    project = {
        "tags": 0, "description": 0,  "highlights": 0, "last_updated": 0
    }
    videos = list(collection.aggregate([{"$match": match}, {'$skip': skip}, {'$limit': limit}, {"$project": project}]))
    for video in videos:
        create_stats_view(video)
    return videos


def get_view_video(video_id):
    collection = get_collection("videos")
    video = collection.find_one({"_id": video_id}, {"last_updated": 0})
    create_stats_view(video)
    return video


def get_view_top_categories():
    collection = get_collection("videos")
    pipeline = [
        {
            "$group": {
                "_id": "$category_id",
                "avg_sentiment": {"$avg": "$sentiment.score"},
                "videos_count": {"$sum": 1},
                "total_views": {"$sum": "$stats.views"},
            }
        },
        {
            "$addFields": {
                "sentiment_label": {
                    "$switch": {
                        "branches": [
                            {"case": {"$lte": ["$avg_sentiment", 0.20]}, "then": "Very Negative"},
                            {"case": {"$and": [{"$gt": ["$avg_sentiment", 0.20]}, {"$lte": ["$avg_sentiment", 0.40]}]},
                             "then": "Negative"},
                            {"case": {"$and": [{"$gt": ["$avg_sentiment", 0.40]}, {"$lte": ["$avg_sentiment", 0.60]}]},
                             "then": "Neutral"},
                            {"case": {"$and": [{"$gt": ["$avg_sentiment", 0.60]}, {"$lte": ["$avg_sentiment", 0.80]}]},
                             "then": "Positive"},
                            {"case": {"$gt": ["$avg_sentiment", 0.80]}, "then": "Very Positive"},
                        ],
                        "default": "Unknown"
                    }
                }
            }
        },
        {
            "$sort": {"avg_sentiment": -1}
        },
        {
            "$limit": 5
        }
    ]
    return list(collection.aggregate(pipeline))
