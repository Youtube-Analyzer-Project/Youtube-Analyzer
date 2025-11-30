from rest_framework.decorators import api_view
from rest_framework.response import Response
from youtube_api.services.youtube_service import get_trending_videos_by_region
from youtube_api.services.mongo_service import save_trending_videos
from youtube_api.views.videos_view import create_trending_videos_view


# Fetches data from YouTube API
# Stores a view of the data in MongoDB
# Returns the raw data
@api_view(["GET"])
def fetch_trending_videos(request):
    region = request.GET.get("region", "RO")
    max_results = int(request.GET.get("max_results", 10))

    try:
        raw_data = get_trending_videos_by_region(region, max_results)
        view = create_trending_videos_view(raw_data)
        save_trending_videos(view)
        return Response(raw_data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
