from django.urls import path

from youtube_api.views.youtube_api_views import get_trending_videos

urlpatterns = [
    path('fetch_trending/', get_trending_videos),
]