import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {SentimentChartDto, SentimentSummaryDto} from '../types/sentiment.types';
import {BaseService} from '../types/base-service';

@Injectable({ providedIn: 'root' })
export class SentimentApiService extends BaseService {
  private readonly _apiBaseUrl = 'http://localhost:8000/api/analytics/sentiment';

  public getSentimentSummary(): Observable<SentimentSummaryDto> {
    return this.httpClient.get<SentimentSummaryDto>(`${this._apiBaseUrl}/summary`)
      .pipe(catchError(this.handleError));
  }

  public getSentimentData(): Observable<SentimentChartDto> {
    return this.httpClient.get<SentimentChartDto>(`${this._apiBaseUrl}/category-timeseries`, {
      params: { days: '30', top: '1' }
    }).pipe(catchError(this.handleError));
  }
}
