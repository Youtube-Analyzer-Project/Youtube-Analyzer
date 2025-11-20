from rest_framework.decorators import api_view
from rest_framework.response import Response

from youtube_api.services.mongo_service import get_raw_videos


@api_view(["GET"])
def get_trending_videos(request):
    max_results = int(request.GET.get("max_results", 10))

    try:
        data = get_raw_videos(max_results)
        result = []
        for item in data:
            result.append({
                "channelTitle": item['snippet']['channelTitle'],
                "title": item['snippet']['title'],
                "viewCount": item['statistics']['viewCount'],
                "likeCount": item['statistics'].get('likeCount', 'N/A'),
                "commentCount": item['statistics'].get('commentCount', 'N/A'),
            })
        return Response(result, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)