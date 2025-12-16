from rest_framework.decorators import api_view
from rest_framework.response import Response
from youtube_api.services.youtube_service import get_trending_videos_by_region, get_comments_by_video_id
from youtube_api.services.mongo_service import save_trending_videos
from youtube_api.views.videos_view import create_trending_videos_view
from youtube_api.services.live_youtube_service import fetch_live_trends_worker
from youtube_api.services.mongo_service import get_live_trend_view
import threading

# Fetches data from YouTube API
# Stores a view of the data in MongoDB
# Returns the raw data
@api_view(["GET"])
def fetch_trending_videos(request):
    region = request.GET.get("region", "RO")
    max_results = int(request.GET.get("max_results", 20))

    try:
        raw_data = get_trending_videos_by_region(region, max_results)
        view = create_trending_videos_view(raw_data)
        save_trending_videos(view)
        return Response(raw_data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def fetch_video_comments(request):

    video_id = request.GET.get("video_id")

    # Basic validation
    if not video_id:
        return Response({"error": "The 'video_id' parameter is required."}, status=400)

    try:
        # Fetch raw comments from YouTube API
        comments_data = get_comments_by_video_id(video_id)

        return Response(comments_data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def get_live_trends(request):
    videos = get_live_trend_view()
    threading.Thread(target=fetch_live_trends_worker, daemon=True).start()
    return Response(videos, status=200)
