import requests
from django.conf import settings

YOUTUBE_API_KEY = settings.YOUTUBE_API_KEY
BASE_URL = "https://www.googleapis.com/youtube/v3/"

def get_trending_videos_by_region(region_code, max_results=10):
    url = f"{BASE_URL}videos"
    params = {
        "part": "snippet,statistics",
        "chart": "mostPopular",
        "regionCode": region_code,
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("items", [])

    return response.raise_for_status()


def get_comments_by_video_id(video_id):
    url = f"{BASE_URL}commentThreads"
    params = {
        "part": "snippet",
        "videoId": video_id,
        "maxResults": 100,
        "order": "relevance",
        "key": YOUTUBE_API_KEY
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json().get("items", [])

    return response.raise_for_status()