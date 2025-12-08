from django.urls import path

from youtube_api.views.sentiment_views import sentiment_summary, sentiment_top_videos_view, \
    sentiment_category_timeseries_view
from youtube_api.views.youtube_api_views import fetch_trending_videos, fetch_video_comments
from youtube_api.views.videos_view import get_trending_videos, get_video, get_top_categories

urlpatterns = [
    path('fetch_trending/', fetch_trending_videos, name='fetch_trending_videos'),
    path('get-trending/', get_trending_videos, name='get_trending'),
    path('fetch_comments/', fetch_video_comments, name='fetch_comments'),
    path('videos/', get_trending_videos, name='get_videos'),
    path('videos/<str:_id>', get_video, name='get_video'),
    path('analytics/top-categories/', get_top_categories, name='get_top_categories'),
    path('analytics/sentiment/summary/', sentiment_summary, name='sentiment_summary'),
    path('analytics/sentiment/top-videos/', sentiment_top_videos_view, name='sentiment_top_videos'),
    path('analytics/sentiment/category-timeseries/', sentiment_category_timeseries_view,
         name='sentiment_category_timeseries'),
]