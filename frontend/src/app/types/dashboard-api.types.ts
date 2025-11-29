export interface DashboardMeta {
  generated_at: string;
  total_videos_processed: number;
}

export interface TopCategoryCard {
  category_id: string;
  category_name: string;
  icon_type: string;
  videos_count: number;
  avg_sentiment_score: number;
  sentiment_label: string;
  total_views: string;
  trend_indicator: 'up' | 'down' | 'flat';
}

export interface VideoStats {
  views: string;
  views_raw: number;
  likes: string;
  sentiment_score: number;
  sentiment_label: string;
}

export interface VideoItem {
  video_id: string;
  title: string;
  thumbnail_url: string;
  category_badge: string;
  channel_name: string;
  published_at: string;
  stats: VideoStats;
}

export interface VideosListPaginated {
  sort_by: string;
  current_page: number;
  total_pages: number;
  items: VideoItem[];
}

export interface DashboardResponse {
  dashboard_meta: DashboardMeta;
  top_categories_cards: TopCategoryCard[];
  videos_list_paginated: VideosListPaginated;
}

export interface VideoDialogData {
  video: VideoItem;
}
