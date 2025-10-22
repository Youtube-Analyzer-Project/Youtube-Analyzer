from django.urls import path

from youtube_api.views.youtube_api_views import get_trending_videos

urlpatterns = [
    path('trending/', get_trending_videos, name='trending_videos'),
]