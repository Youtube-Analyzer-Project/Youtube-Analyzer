from django.urls import path

from youtube_api.views.youtube_api_views import fetch_trending_videos, fetch_video_comments
from youtube_api.views.videos_view import get_trending_videos

urlpatterns = [
    path('fetch_trending/', fetch_trending_videos, name='fetch_trending_videos'),
    path('fetch_comments/', fetch_video_comments, name='fetch_comments'),
    path('get_trending/', get_trending_videos, name='get_trending_videos')
]