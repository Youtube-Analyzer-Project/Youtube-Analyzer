import requests

# TODO: Add the API key here
APY_KEY = ""
BASE_URL = "https://www.googleapis.com/youtube/v3/"

def get_trending_videos_by_region(region_code, max_results=10):
    url = f"{BASE_URL}videos"
    params = {
        "part": "snippet,statistics",
        "chart": "mostPopular",
        "regionCode": region_code,
        "maxResults": max_results,
        "key": APY_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response.json()

    return response.raise_for_status()

