import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { SentimentApiService } from '../../services/sentiment-api.service';
import { Subscription } from 'rxjs';
import {
  SentimentChartSeriesDto,
  SentimentSummaryDto,
  SentimentVideoDto,
  Widget,
} from '../../types/sentiment.types';
import { SentimentLineChartComponent } from './charts/sentiment-line-chart/sentiment-line-chart.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SentimentPieChartComponent } from './charts/sentiment-pie-chart/sentiment-pie-chart.component';
import { VideoListComponent } from './video-list/video-list.component';

// TODO: Remove mock data when added more sentiment data
const MOCK_SERIES: SentimentChartSeriesDto[] = [
  // -------- CATEGORY 1 --------
  { date: '2025-12-10', category_id: '1', avg_score: 0.08 },
  { date: '2025-12-11', category_id: '1', avg_score: 0.12 },
  { date: '2025-12-12', category_id: '1', avg_score: -0.03 },
  { date: '2025-12-13', category_id: '1', avg_score: 0.18 },
  { date: '2025-12-14', category_id: '1', avg_score: 0.25 },
  { date: '2025-12-15', category_id: '1', avg_score: 0.09 },
  { date: '2025-12-16', category_id: '1', avg_score: -0.14 },
  { date: '2025-12-17', category_id: '1', avg_score: 0.04 },
  { date: '2025-12-18', category_id: '1', avg_score: 0.31 },
  { date: '2025-12-19', category_id: '1', avg_score: 0.27 },

  // -------- CATEGORY 2 --------
  { date: '2025-12-10', category_id: '2', avg_score: -0.12 },
  { date: '2025-12-11', category_id: '2', avg_score: -0.05 },
  { date: '2025-12-12', category_id: '2', avg_score: 0.02 },
  { date: '2025-12-13', category_id: '2', avg_score: 0.15 },
  { date: '2025-12-14', category_id: '2', avg_score: 0.22 },
  { date: '2025-12-15', category_id: '2', avg_score: 0.18 },
  { date: '2025-12-16', category_id: '2', avg_score: 0.05 },
  { date: '2025-12-17', category_id: '2', avg_score: -0.02 },
  { date: '2025-12-18', category_id: '2', avg_score: 0.11 },
  { date: '2025-12-19', category_id: '2', avg_score: 0.09 },

  // -------- CATEGORY 3 --------
  { date: '2025-12-10', category_id: '3', avg_score: 0.32 },
  { date: '2025-12-11', category_id: '3', avg_score: 0.28 },
  { date: '2025-12-12', category_id: '3', avg_score: 0.2 },
  { date: '2025-12-13', category_id: '3', avg_score: 0.14 },
  { date: '2025-12-14', category_id: '3', avg_score: 0.1 },
  { date: '2025-12-15', category_id: '3', avg_score: 0.06 },
  { date: '2025-12-16', category_id: '3', avg_score: -0.01 },
  { date: '2025-12-17', category_id: '3', avg_score: 0.04 },
  { date: '2025-12-18', category_id: '3', avg_score: 0.09 },
  { date: '2025-12-19', category_id: '3', avg_score: 0.13 },
];

@Component({
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: [
    WidgetComponent,
    SentimentLineChartComponent,
    MatProgressSpinner,
    SentimentPieChartComponent,
    VideoListComponent,
  ],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.scss',
})
export class SentimentAnalysisComponent implements OnInit, OnDestroy {
  private _sentimentService = inject(SentimentApiService);
  private _sentimentSummarySubscription: Subscription = new Subscription();
  private _sentimentChartsSubscription: Subscription = new Subscription();
  private _positiveVideosSubscription: Subscription = new Subscription();
  private _neutralVideosSubscription: Subscription = new Subscription();
  private _negativeVideosSubscription: Subscription = new Subscription();

  protected chartIsLoaded = signal<boolean>(false);
  protected videosAreLoaded = signal<boolean>(false);
  protected widgets = signal<Widget[]>([]);
  protected lineChartData = signal<SentimentChartSeriesDto[]>([]);
  protected dataset1 = signal<SentimentChartSeriesDto[]>([]);
  protected dataset2 = signal<SentimentChartSeriesDto[]>([]);
  protected dataset3 = signal<SentimentChartSeriesDto[]>([]);
  protected sentimentDistributions = signal<number[]>([]);
  protected positiveVideos = signal<SentimentVideoDto[]>([]);
  protected negativeVideos = signal<SentimentVideoDto[]>([]);

  ngOnInit(): void {
    this._getWidgets();
    this._getChartData();
    this._getSentimentVideos();
  }

  ngOnDestroy(): void {
    this._sentimentSummarySubscription.unsubscribe();
    this._sentimentChartsSubscription.unsubscribe();
    this._positiveVideosSubscription.unsubscribe();
    this._neutralVideosSubscription.unsubscribe();
    this._negativeVideosSubscription.unsubscribe();
  }

  private _getWidgets(): void {
    this._sentimentSummarySubscription = this._sentimentService
      .getSentimentSummary()
      .subscribe((data: SentimentSummaryDto) => {
        const sentiment =
          data.overall_sentiment_label === 'Positive'
            ? 'sentiment_satisfied'
            : data.overall_sentiment_label === 'Negative'
            ? 'sentiment_dissatisfied'
            : 'sentiment_neutral';
        const increasing =
          data.overall_trend_label === 'Increasing' ? 'trending_up' : 'trending_down';
        const sentimentWidgets: Widget[] = [
          {
            id: 1,
            label: 'Total Videos Analyzed',
            content: `${data.total_videos}`,
            details: 'Videos in the last 30 days',
            icon: 'play_circle',
          },
          {
            id: 2,
            label: 'Total Views (Aggregated)',
            content: this._formatNumber(data.total_views),
            details: 'Views across all analyzed videos',
            icon: 'visibility',
          },
          {
            id: 3,
            label: 'Overall Sentiment Score',
            content: `${data.avg_sentiment.toFixed(2)} (${data.overall_sentiment_label})`,
            details: 'Compared to last period',
            icon: sentiment,
          },
          {
            id: 4,
            label: 'Trending Sentiment Direction',
            content: data.overall_trend_label,
            details: 'Compared to last period',
            icon: increasing,
          },
        ];
        const veryPositiveCount = data.sentiment_distribution.very_positive;
        const veryNegativeCount = data.sentiment_distribution.very_negative;
        const positiveCount = data.sentiment_distribution.positive;
        const neutralCount = data.sentiment_distribution.neutral;
        const negativeCount = data.sentiment_distribution.negative;
        this.sentimentDistributions.set([
          veryPositiveCount,
          positiveCount,
          neutralCount,
          negativeCount,
          veryNegativeCount,
        ]);
        this.widgets.set(sentimentWidgets);
      });
  }

  private _getChartData(): void {
    this._sentimentChartsSubscription = this._sentimentService.getSentimentData().subscribe({
      next: (data) => {
        const seriesData = data.series || [];
        const categories = data.categories || [];

        this.lineChartData.set(seriesData);

        categories.forEach((cat: any, index: number) => {
          const series = seriesData.filter((s) => s.category_id === cat.id);

          if (index === 0) {
            this.dataset1.set(series);
          } else if (index === 1) {
            this.dataset2.set(series);
          } else if (index === 2) {
            this.dataset3.set(series);
          }
        });

        this.chartIsLoaded.set(true);
      },
      error: (err) => {
        console.error('Sentiment Chart Error:', err);
        this.chartIsLoaded.set(false);
      },
    });
  }

  private _getSentimentVideos(): void {
    this._positiveVideosSubscription = this._sentimentService
      .getVideosBySentiment('positive')
      .subscribe((data: SentimentVideoDto[]) => {
        this.positiveVideos.set(data);
        this._negativeVideosSubscription = this._sentimentService
          .getVideosBySentiment('negative')
          .subscribe((data: SentimentVideoDto[]) => {
            this.negativeVideos.set(data);
            this.videosAreLoaded.set(true);
          });
      });
  }

  private _getSeriesByCategory(categoryId: string): SentimentChartSeriesDto[] {
    return this.lineChartData().filter((series) => series.category_id === categoryId);
  }

  private _formatNumber(value: number): string {
    if (!value) {
      return '';
    }

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'B';
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M';
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'K';
    }

    return value.toString();
  }
}
