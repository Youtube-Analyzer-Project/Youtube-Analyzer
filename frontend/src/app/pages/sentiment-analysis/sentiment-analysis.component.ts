import {Component, OnInit, inject, signal, OnDestroy} from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { MatToolbar } from '@angular/material/toolbar';
import {SentimentApiService} from '../../services/sentiment-api.service';
import {Subscription} from 'rxjs';
import {SentimentSummaryDto, Widget} from '../../types/sentiment.types';

@Component({
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: [WidgetComponent, MatToolbar],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.scss',
})
export class SentimentAnalysisComponent implements OnInit, OnDestroy {
  private _sentimentService = inject(SentimentApiService);

  private _sentimentSummarySubscription: Subscription = new Subscription();

  protected widgets = signal<Widget[]>([]);
  protected charts = signal<Widget[]>([]);

  ngOnInit(): void {
    this._getWidgets();
  }

  ngOnDestroy(): void {
    this._sentimentSummarySubscription.unsubscribe();
  }

  private _getWidgets(): void {
    this._sentimentSummarySubscription = this._sentimentService.getSentimentSummary().subscribe((data: SentimentSummaryDto) => {
      const sentimentWidgets: Widget[] = [
        {
          id: 1,
          label: 'Total Videos Analyzed',
          content: `${data.total_videos}`,
          details: 'Videos in the last 30 days',
          icon: 'play_circle'
        },
        {
          id: 2,
          label: 'Total Views (Aggregated)',
          content: this._formatNumber(data.total_views),
          details: 'Views across all analyzed videos',
          icon: 'visibility'
        },
        {
          id: 3,
          label: 'Average Sentiment Score',
          content: `${data.avg_sentiment.toFixed(2)} (${data.overall_sentiment_label})`,
          details: 'Compared to last period',
          icon: 'sentiment_neutral'
        },
        {
          id: 4,
          label: 'Trending Sentiment Direction',
          content: data.overall_trend_label,
          details: 'Compared to last period',
          icon: 'arrow_outward'
        }
      ];
      this.widgets.set(sentimentWidgets);
    });
  }

  private _formatNumber(n: number): string {
    if (n >= 1_000_000_000) {
      return (n / 1_000_000_000).toFixed(1) + 'B';
    }

    if (n >= 1_000_000) {
      return (n / 1_000_000).toFixed(1) + 'M';
    }

    if (n >= 1_000) {
      return (n / 1_000).toFixed(1) + 'K';
    }

    return n.toString();
  }
}
