import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardResponse } from '../types/dashboard-api.types';
import {
  BackendVideosResponse,
  BackendTopCategory,
  BackendVideoDetails,
} from '../types/backend-api.types';
import { getCategoryName } from '../constants/youtube_categories';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly apiBaseUrl = 'http://backend:8000/api';

  constructor(private http: HttpClient) {}

  getDashboard(page = 1, page_size = 5, search = ''): Observable<DashboardResponse> {
    let params = new HttpParams().set('page', page.toString()).set('limit', '10');

    if (page_size) {
      params = params.set('limit', page_size);
    }

    if (search) {
      params = params.set('search', search);
    }

    const videos$ = this.http.get<BackendVideosResponse>(`${this.apiBaseUrl}/videos/`, { params });

    const topCategories$ = this.http.get<BackendTopCategory[]>(
      `${this.apiBaseUrl}/analytics/top-categories/`
    );

    return forkJoin({ videos: videos$, topCategories: topCategories$ }).pipe(
      map(({ videos, topCategories }): DashboardResponse => {
        const total_pages = videos.meta.total_items;

        return {
          dashboard_meta: {
            generated_at: new Date().toISOString(),
            total_videos_processed: videos.meta.total_items,
          },

          top_categories_cards: topCategories.map((c) => ({
            category_id: c._id,
            category_name: getCategoryName(c._id),
            icon_type: this.mapCategoryIcon(c._id),
            videos_count: c.videos_count,
            avg_sentiment_score: Math.round(c.avg_sentiment * 100),
            sentiment_label: c.sentiment_label,
            total_views: this.formatNumberShort(c.total_views),
            trend_indicator: 'flat',
          })),

          videos_list_paginated: {
            sort_by: 'views_desc',
            current_page: videos.meta.page_number,
            total_pages,
            items: videos.items.map((v) => ({
              video_id: v._id,
              title: v.title,
              thumbnail_url: v.thumbnail_url,
              category_badge: getCategoryName(v.category_id),
              channel_name: v.channel_name,
              published_at: v.published_at,
              stats: {
                views: this.formatNumberShort(v.stats.views),
                views_raw: v.stats.views,
                likes: this.formatNumberShort(v.stats.likes),
                sentiment_score: Math.round(v.stats.sentiment_score * 100),
                sentiment_label: v.stats.sentiment_label,
              },
            })),
          },
        };
      })
    );
  }

  getVideoDetails(id: string): Observable<BackendVideoDetails> {
    return this.http.get<BackendVideoDetails>(`${this.apiBaseUrl}/videos/${id}`);
  }

  private formatNumberShort(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return value.toString();
  }

  private mapCategoryIcon(id: string): string {
    const map: Record<string, string> = {
      '10': 'music_note',
      '20': 'gamepad',
      '25': 'newspaper',
      '17': 'trophy',
      '22': 'group',
    };
    return map[id] ?? 'category';
  }
}
