from youtube_api.services.youtube_service import get_trending_videos_by_region, get_comments_by_video_id
from youtube_api.services.mongo_service import save_trending_videos
from youtube_api.views.videos_view import create_trending_videos_view
from concurrent.futures import ThreadPoolExecutor, as_completed
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Import your services
from youtube_api.services.youtube_service import get_trending_live_streams, fetch_live_comments
from youtube_api.services.sentiment_analysis_service import analyze_video

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

def process_single_video(video):
    """
    Helper function to fetch comments and analyze a single video.
    This enables us to run this logic in parallel.
    """
    try:
        # 1. Fetch Comments
        comments = fetch_live_comments(video["liveChatId"])

        # 2. Analyze Sentiment
        # If no comments, we might default score to 0 or neutral
        if not comments:
            video["score"] = 0.0
            video["comments"] = []
        else:
            video["score"] = analyze_video(comments)
            video["comments"] = comments

        return video
    except Exception:
        # If analysis fails, return the video with a 0 score so it doesn't crash the list
        video["score"] = 0.0
        return video


@api_view(["GET"])
def get_live_trends(request):
    # 1. Fetch the raw list of currently live videos (The fresh, category-based function we wrote)
    # This guarantees the videos are actually live RIGHT NOW.
    try:
        raw_videos = get_trending_live_streams()
    except Exception as e:
        return Response({"error": f"Failed to fetch from YouTube: {str(e)}"}, status=500)

    if not raw_videos:
        return Response([], status=200)

    # 2. Parallel Processing (The "Secret Sauce")
    # Analyzing 20 videos sequentially takes ~10 seconds.
    # Doing it in parallel takes ~1-2 seconds.
    processed_videos = []

    with ThreadPoolExecutor(max_workers=10) as executor:
        # Submit all tasks
        future_to_video = {executor.submit(process_single_video, video): video for video in raw_videos}

        for future in as_completed(future_to_video):
            data = future.result()
            processed_videos.append(data)

    # 3. Filter and Sort (In Memory)
    # Filter: Only show positive sentiment (if that's your requirement)
    videos_with_live_chat = [v for v in processed_videos if v.get("score", 0) > 0.0]

    # Sort: Most concurrent viewers first (usually better than start time for "Trends")
    # If you prefer start time: key=lambda x: x["startedAt"]
    videos_with_live_chat.sort(key=lambda x: x.get("concurrentViewers", 0), reverse=True)

    # 4. Return directly (No DB storage required for the response)
    return Response(videos_with_live_chat, status=200)
