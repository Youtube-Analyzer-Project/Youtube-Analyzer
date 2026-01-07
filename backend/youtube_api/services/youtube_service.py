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


def get_trending_live_streams():
    url = f"{BASE_URL}search"
    params = {
        "part": "snippet",
        "eventType": "live",
        "type": "video",
        "order": "viewCount",
        "maxResults": 30,
        "regionCode": "GB",
        "key": YOUTUBE_API_KEY,
        "q": " ",
        "relevanceLanguage": "en"
    }
    response = requests.get(url, params=params)
    search_data = response.json()
    video_ids = [item["id"]["videoId"] for item in search_data.get("items", [])]

    if not video_ids:
        return []

    videos_url = f"{BASE_URL}videos"
    videos_params = {
        "part": "snippet,liveStreamingDetails,statistics",
        "id": ",".join(video_ids),
        "key": YOUTUBE_API_KEY,
        "regionCode": "RO",
    }
    videos_resp = requests.get(videos_url, params=videos_params)
    videos_data = videos_resp.json()

    live_streams = []
    for item in videos_data.get("items", []):
        live_chat_id = item.get("liveStreamingDetails", {}).get("activeLiveChatId")
        snippet = item.get("snippet", {})
        thumbnails = snippet.get("thumbnails", {})

        thumbnail_url = None
        if "maxres" in thumbnails:
            thumbnail_url = thumbnails["maxres"]["url"]

        if live_chat_id:
            live_streams.append({
                "_id": item["id"],
                "title": snippet["title"],
                "channel": snippet["channelTitle"],
                "liveChatId": live_chat_id,
                "viewCount": item.get("statistics", {}).get("viewCount"),
                "thumbnail": thumbnail_url,
                "startedAt": item.get("liveStreamingDetails", {}).get("actualStartTime")
            })
    return live_streams

def fetch_live_comments(live_chat_id, max_comments=20):
    url = f"{BASE_URL}liveChat/messages"
    params = {
        "liveChatId": live_chat_id,
        "part": "snippet",
        "maxResults": max_comments,
        "key": YOUTUBE_API_KEY
    }
    response = requests.get(url, params=params)
    data = response.json()

    comments = []
    for msg in data.get("items", []):
        try:
            text = msg["snippet"]["displayMessage"]
            comments.append(text)
        except Exception as e:
            pass
    print(live_chat_id, len(comments), end="\n", flush=True)
    return comments