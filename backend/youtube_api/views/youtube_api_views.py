from rest_framework.decorators import api_view
from rest_framework.response import Response
from youtube_api.services.youtube_service import get_trending_videos_by_region

@api_view(["GET"])
def get_trending_videos(request):
    region = request.GET.get("region", "RO")
    max_results = int(request.GET.get("max_results", 100))
    try:
        data = get_trending_videos_by_region(region, max_results)
        return Response(data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
