from rest_framework.decorators import api_view
from rest_framework.response import Response

from youtube_api.services.mongo_service import get_view_videos

@api_view(["GET"])
def get_trending_videos(request):
    max_results = int(request.GET.get("max_results", 10))

    try:
        data = get_view_videos(max_results)
        return Response(data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

def create_trending_videos_view(videos):
    videos_view = []
    for video in videos:
        videos_view.append({
            "channelTitle": video['snippet']['channelTitle'],
            "title": video['snippet']['title'],
            "viewCount": video['statistics']['viewCount'],
            "likeCount": video['statistics'].get('likeCount', 'N/A'),
            "commentCount": video['statistics'].get('commentCount', 'N/A'),
        })
    return videos_view
