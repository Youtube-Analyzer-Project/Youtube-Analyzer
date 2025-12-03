from rest_framework.decorators import api_view
from rest_framework.response import Response

from youtube_api.services.mongo_service import get_view_videos, get_view_video, get_view_top_categories



@api_view(["GET"])
def get_trending_videos(request):
    page = int(request.GET.get("page", 1))
    limit = int(request.GET.get("limit", 10))
    search = request.GET.get("search", None)
    try:
        videos, total_videos = get_view_videos((page - 1) * limit, limit, search)
        response_json = {
            "meta": {
                "page_number": page,
                "items_per_page": limit,
                "total_items": total_videos
            },
            "items": videos
        }
        return Response(response_json, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def get_video(request, _id):
    try:
        video = get_view_video(_id)
        return Response(video, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_top_categories(request):
    try:
        categories = get_view_top_categories()
        return Response(categories, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

def create_trending_videos_view(videos):
    videos_view = []
    for video in videos:
        videos_view.append({
            "id": video['id'],
            "channelTitle": video['snippet']['channelTitle'],
            "title": video['snippet']['title'],
            "viewCount": video['statistics']['viewCount'],
            "likeCount": video['statistics'].get('likeCount', 'N/A'),
            "commentCount": video['statistics'].get('commentCount', 'N/A'),
            "thumbnailUrl": video['snippet']['thumbnails']['default'],
            "categoryId": video['snippet']['categoryId'],
            "publishedAt": video['snippet']['publishedAt'],
            "description": video['snippet']['description'],
            "tags": video['snippet'].get('tags', [])
        })
    return videos_view
