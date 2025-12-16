from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from youtube_api.services.mongo_service import (
    get_sentiment_summary,
    get_sentiment_top_videos, get_sentiment_timeseries_top_categories,
)


@require_http_methods(["GET"])
def sentiment_summary(request):
    """
    GET /analytics/sentiment/summary/
    """
    data = get_sentiment_summary()
    return JsonResponse(data, safe=False)


@require_http_methods(["GET"])
def sentiment_top_videos_view(request):
    """
    GET /analytics/sentiment/top-videos/?direction=positive&limit=5
    direction: positive | negative
    """
    direction = request.GET.get("direction", "positive")
    limit_param = request.GET.get("limit", "5")
    try:
        limit = int(limit_param)
    except ValueError:
        limit = 5

    if direction not in ["positive", "negative"]:
        direction = "positive"

    videos = get_sentiment_top_videos(limit=limit, direction=direction)
    return JsonResponse(videos, safe=False)

@require_http_methods(["GET"])
def sentiment_category_timeseries_view(request):
    """
    GET /analytics/sentiment/category-timeseries/?days=30&top=5

    Used for "Sentiment Over Time" chart with lines for each category
    (top K categories by sentiment score in the last N days).
    """
    days_param = request.GET.get("days", "30")
    top_param = request.GET.get("top", "5")

    try:
        days = int(days_param)
    except ValueError:
        days = 30

    try:
        top_k = int(top_param)
    except ValueError:
        top_k = 5

    data = get_sentiment_timeseries_top_categories(days=days, top_k=top_k)
    return JsonResponse(data, safe=False)