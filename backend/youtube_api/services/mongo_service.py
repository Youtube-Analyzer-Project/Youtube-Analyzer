from pymongo import MongoClient
from django.conf import settings
from datetime import timedelta, datetime

# MongoDB Configuration
MONGO_URI = settings.MONGO_URI
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["youtube_analytics"]

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
    total_videos = collection.count_documents({})

    for video in videos:
        create_stats_view(video)
    return videos, total_videos


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

def _map_sentiment_label(score: float) -> str:
    if score is None:
        return "Unknown"
    if score <= 0.20:
        return "Very Negative"
    if 0.20 < score <= 0.40:
        return "Negative"
    if 0.40 < score <= 0.60:
        return "Neutral"
    if 0.60 < score <= 0.80:
        return "Positive"
    if score > 0.80:
        return "Very Positive"
    return "Unknown"


def get_sentiment_summary():

    collection = get_collection("videos")

    pipeline = [
        {
            "$group": {
                "_id": None,
                "total_videos": {"$sum": 1},
                "total_views": {"$sum": "$stats.views"},
                "avg_sentiment": {"$avg": "$sentiment.score"},
                "positive": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.label", "Positive"]}, 1, 0]
                    }
                },
                "neutral": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.label", "Neutral"]}, 1, 0]
                    }
                },
                "negative": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.label", "Negative"]}, 1, 0]
                    }
                },
                "trend_increasing": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.trend", "increasing"]}, 1, 0]
                    }
                },
                "trend_stable": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.trend", "stable"]}, 1, 0]
                    }
                },
                "trend_decreasing": {
                    "$sum": {
                        "$cond": [{"$eq": ["$sentiment.trend", "decreasing"]}, 1, 0]
                    }
                },
            }
        }
    ]

    agg = list(collection.aggregate(pipeline))
    if not agg:
        # fallback when there are no videos in the collection
        return {
            "total_videos": 0,
            "total_views": 0,
            "avg_sentiment": None,
            "overall_sentiment_label": "Unknown",
            "sentiment_distribution": {
                "positive": 0,
                "neutral": 0,
                "negative": 0,
            },
            "trend_distribution": {
                "increasing": 0,
                "stable": 0,
                "decreasing": 0,
            },
            "overall_trend_label": "Unknown",
        }

    doc = agg[0]

    sentiment_distribution = {
        "positive": doc.get("positive", 0),
        "neutral": doc.get("neutral", 0),
        "negative": doc.get("negative", 0),
    }

    trend_distribution = {
        "increasing": doc.get("trend_increasing", 0),
        "stable": doc.get("trend_stable", 0),
        "decreasing": doc.get("trend_decreasing", 0),
    }

    avg_sentiment = doc.get("avg_sentiment")
    overall_sentiment_label = _map_sentiment_label(avg_sentiment)

    inc = trend_distribution["increasing"]
    dec = trend_distribution["decreasing"]
    if inc > dec:
        overall_trend_label = "Increasing"
    elif dec > inc:
        overall_trend_label = "Decreasing"
    else:
        overall_trend_label = "Stable"

    return {
        "total_videos": doc.get("total_videos", 0),
        "total_views": doc.get("total_views", 0),
        "avg_sentiment": avg_sentiment,
        "overall_sentiment_label": overall_sentiment_label,
        "sentiment_distribution": sentiment_distribution,
        "trend_distribution": trend_distribution,
        "overall_trend_label": overall_trend_label,
    }


def get_sentiment_top_videos(limit: int = 5, direction: str = "positive"):
    collection = get_collection("videos")

    sort_order = -1 if direction == "positive" else 1

    cursor = collection.find({}, {
        "tags": 0,
        "description": 0,
        "highlights": 0,
        "last_updated": 0,
    }).sort("sentiment.score", sort_order).limit(limit)

    videos = list(cursor)
    for v in videos:
        create_stats_view(v)

    return videos

def get_sentiment_timeseries_top_categories(days: int = 30, top_k: int = 5):
    collection = get_collection("videos")

    start_dt = datetime.utcnow() - timedelta(days=days)
    start_str = start_dt.isoformat()

    top_pipeline = [
        {"$unwind": "$sentiment.history"},
        {
            "$match": {
                "sentiment.history.date": {"$gte": start_str}
            }
        },
        {
            "$group": {
                "_id": "$category_id",
                "total_views": {"$sum": "$sentiment.history.views"},
                "videos_count": {"$sum": 1}
            }
        },
        {"$sort": {"total_views": -1}},
        {"$limit": top_k}
    ]

    top_docs = list(collection.aggregate(top_pipeline))
    if not top_docs:
        return {"categories": [], "series": []}

    category_ids = [d["_id"] for d in top_docs]

    categories_meta = [
        {
            "id": d["_id"],
            "total_views": d.get("total_views", 0),
            "videos_count": d.get("videos_count", 0),
        }
        for d in top_docs
    ]

    ts_pipeline = [
        {"$match": {"category_id": {"$in": category_ids}}},
        {"$unwind": "$sentiment.history"},
        {
            "$match": {
                "sentiment.history.date": {"$gte": start_str}
            }
        },
        {
            "$group": {
                "_id": {
                    "date": {"$substr": ["$sentiment.history.date", 0, 10]},
                    "category_id": "$category_id",
                },
                "avg_score": {"$avg": "$sentiment.history.score"},
            }
        },
        {"$sort": {"_id.date": 1, "_id.category_id": 1}},
    ]

    docs = list(collection.aggregate(ts_pipeline))

    series = [
        {
            "date": d["_id"]["date"],
            "category_id": d["_id"]["category_id"],
            "avg_score": d["avg_score"],
        }
        for d in docs
    ]

    return {
        "categories": categories_meta,
        "series": series,
    }

def store_live_trends(videos):
    if videos:
        collection = get_collection("view_live_trends")
        collection.insert_many(videos)

def get_live_trend_view():
    return list(get_collection("view_live_trends").find({}))
