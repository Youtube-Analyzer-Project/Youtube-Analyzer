export interface BackendVideosResponse {
  meta: {
    page_number: number;
    items_per_page: number;
    total_items: number;
  };
  items: BackendVideoListItem[];
}

export interface BackendVideoListItem {
  _id: string;
  title: string;
  thumbnail_url: string;
  channel_name: string;
  published_at: string;
  category_id: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    sentiment_label: string;
    sentiment_score: number;
  };
}

export interface BackendTopCategory {
  _id: string;
  avg_sentiment: number;
  videos_count: number;
  total_views: number;
  sentiment_label: string;
}

export interface BackendVideoDetails {
  _id: string;
  title: string;
  thumbnail_url: string;
  channel_name: string;
  published_at: string;
  category_id: string;
  tags: string[];
  description: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    sentiment_label: string;
    sentiment_score: number;
  };
  highlights: {
    top_positive: [string, string, number][];
    top_negative: [string, string, number][];
  };
}
