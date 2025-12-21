import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
  SentimentChartDto,
  SentimentSummaryDto,
  SentimentVideoDto,
} from '../types/sentiment.types';
import { BaseService } from '../types/base-service';

@Injectable({ providedIn: 'root' })
export class SentimentApiService extends BaseService {
  private readonly _apiBaseUrl = 'http://localhost:8000/api/analytics/sentiment';

  public getSentimentSummary(): Observable<SentimentSummaryDto> {
    return this.httpClient
      .get<SentimentSummaryDto>(`${this._apiBaseUrl}/summary`)
      .pipe(catchError(this.handleError));
  }

  public getSentimentData(): Observable<SentimentChartDto> {
    return this.httpClient
      .get<SentimentChartDto>(`${this._apiBaseUrl}/category-timeseries`, {
        params: { days: '120', top: '3' },
      })
      .pipe(catchError(this.handleError));
  }

  public getVideosBySentiment(sentiment: string): Observable<SentimentVideoDto[]> {
    return this.httpClient
      .get<SentimentVideoDto[]>(`${this._apiBaseUrl}/top-videos`, {
        params: { direction: sentiment, limit: '3' },
      })
      .pipe(catchError(this.handleError));
  }
}
