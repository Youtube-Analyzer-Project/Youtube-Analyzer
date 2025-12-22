export interface Widget {
  id: number;
  label: string;
  content: string;
  details: string;
  icon: string;
}

export interface SentimentSummaryDto {
  total_videos: number;
  total_views: number;
  avg_sentiment: number;
  overall_sentiment_label: string;
  sentiment_distribution: {
    very_positive: number;
    positive: number;
    neutral: number;
    negative: number;
    very_negative: number;
  };
  trend_distribution: {
    increasing: number;
    stable: number;
    decreasing: number;
  };
  overall_trend_label: string;
}

export interface SentimentChartSeriesDto {
  date: string;
  category_id: string;
  avg_score: number;
}

export interface SentimentChartCategoriesDto {
  id: string;
  total_views: number;
  views_count: number;
}

export interface SentimentChartDto {
  categories: SentimentChartCategoriesDto[];
  series: SentimentChartSeriesDto[];
}

export interface SentimentVideoDto {
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
    sentiment_score: number;
    sentiment_label: string;
  };
}
