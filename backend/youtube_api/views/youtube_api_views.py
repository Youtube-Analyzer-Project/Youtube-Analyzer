from rest_framework.decorators import api_view
from rest_framework.response import Response
from youtube_api.services.youtube_service import get_trending_videos_by_region
from youtube_api.services.mongo_service import save_trending_videos

@api_view(["GET"])
def fetch_trending_videos(request):
    region = request.GET.get("region", "RO")
    max_results = int(request.GET.get("max_results", 10))

    try:
        data = get_trending_videos_by_region(region, max_results)
        save_trending_videos(data)
        return Response({"message": f"Successfully saved {len(data)} trending videos for region {region}."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
