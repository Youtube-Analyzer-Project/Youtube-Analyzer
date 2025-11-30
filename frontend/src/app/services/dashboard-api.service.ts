import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardResponse } from '../types/dashboard-api.types';

const MOCK_DASHBOARD: DashboardResponse = {
  dashboard_meta: {
    generated_at: '2025-11-26T22:30:00Z',
    total_videos_processed: 1500,
  },

  top_categories_cards: [
    {
      category_id: '10',
      category_name: 'Music',
      icon_type: 'music_note',
      videos_count: 450,
      avg_sentiment_score: 85,
      sentiment_label: 'Very Positive',
      total_views: '15.2M',
      trend_indicator: 'up',
    },
    {
      category_id: '20',
      category_name: 'Gaming',
      icon_type: 'gamepad',
      videos_count: 320,
      avg_sentiment_score: 62,
      sentiment_label: 'Neutral',
      total_views: '8.5M',
      trend_indicator: 'flat',
    },
    {
      category_id: '25',
      category_name: 'News & Politics',
      icon_type: 'newspaper',
      videos_count: 210,
      avg_sentiment_score: 35,
      sentiment_label: 'Negative',
      total_views: '12.1M',
      trend_indicator: 'down',
    },
    {
      category_id: '17',
      category_name: 'Sports',
      icon_type: 'trophy',
      videos_count: 180,
      avg_sentiment_score: 78,
      sentiment_label: 'Positive',
      total_views: '5.4M',
      trend_indicator: 'up',
    },
    {
      category_id: '22',
      category_name: 'People & Blogs',
      icon_type: 'group',
      videos_count: 140,
      avg_sentiment_score: 55,
      sentiment_label: 'Neutral',
      total_views: '2.3M',
      trend_indicator: 'flat',
    },
  ],

  videos_list_paginated: {
    sort_by: 'views_desc',
    current_page: 1,
    total_pages: 15,
    items: [
      {
        video_id: '48N5dsCzabc',
        title: 'Andrei Banuta - Asta Este O Papusa',
        thumbnail_url: 'https://i.ytimg.com/vi/48N5dsCzabc/mqdefault.jpg',
        category_badge: 'Music',
        channel_name: 'Andrei Banuta',
        published_at: '2025-11-24',
        stats: {
          views: '645K',
          views_raw: 645013,
          likes: '11.7K',
          sentiment_score: 85,
          sentiment_label: 'Positive',
        },
      },
      {
        video_id: 'v2_abc',
        title: 'Finala Chefi la Cutite 2025',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Entertainment',
        channel_name: 'Antena 1',
        published_at: '2025-11-25',
        stats: {
          views: '520K',
          views_raw: 520000,
          likes: '8.2K',
          sentiment_score: 60,
          sentiment_label: 'Neutral',
        },
      },
      {
        video_id: 'v3_def',
        title: 'Breaking News: Alegeri 2025',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'News',
        channel_name: 'Digi24',
        published_at: '2025-11-26',
        stats: {
          views: '480K',
          views_raw: 480000,
          likes: '3.5K',
          sentiment_score: 25,
          sentiment_label: 'Negative',
        },
      },
      {
        video_id: 'v4_ghi',
        title: 'FIFA 26 Gameplay - First Look',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Gaming',
        channel_name: 'iRaphahell',
        published_at: '2025-11-23',
        stats: {
          views: '310K',
          views_raw: 310000,
          likes: '25K',
          sentiment_score: 92,
          sentiment_label: 'Very Positive',
        },
      },
      {
        video_id: 'v5_jkl',
        title: 'Alt video doar ca sa umplem lista',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Comedy',
        channel_name: 'Random Channel',
        published_at: '2025-11-20',
        stats: {
          views: '150K',
          views_raw: 150000,
          likes: '2.3K',
          sentiment_score: 55,
          sentiment_label: 'Neutral',
        },
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  getDashboard(page = 1, search = '', categoryId?: string): Observable<DashboardResponse> {
    // IMPORTANT: deocamdata intoarcem doar mock-ul
    console.log('getDashboard called with', { page, search, categoryId });
    return of(MOCK_DASHBOARD);
  }
}
