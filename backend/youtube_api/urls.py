from django.urls import path

from youtube_api.views.youtube_api_views import fetch_trending_videos
from youtube_api.views.raw_videos_view import get_trending_videos

urlpatterns = [
    path('fetch_trending/', fetch_trending_videos, name='fetch_trending_videos'),
    path('get_trending/', get_trending_videos, name='get_trending_videos')
]