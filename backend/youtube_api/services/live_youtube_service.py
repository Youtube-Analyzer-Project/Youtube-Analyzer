from youtube_api.services.youtube_service import get_trending_live_streams, fetch_live_comments
from youtube_api.services.mongo_service import store_live_trends
from youtube_api.services.sentiment_analysis_service import analyze_video

def fetch_live_trends_worker():
    videos = get_trending_live_streams()
    for video in videos:
        comments = fetch_live_comments(video["liveChatId"])
        video["score"] = analyze_video(comments)
    videos.sort(key=lambda x: x["score"], reverse=True)
    videos_with_live_chat = [video for video in videos if video["score"] > 0.0]
    store_live_trends(videos_with_live_chat)
