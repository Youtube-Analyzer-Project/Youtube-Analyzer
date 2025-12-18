import {Injectable} from '@angular/core';
import {BaseService} from '../types/base-service';
import {LiveVideo} from '../types/live-video.type';
import {catchError, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LiveSentimentApiService extends BaseService {
  private readonly _apiBaseUrl = 'http://localhost:8000/api/live_trends';

  public getLiveVideos(): Observable<LiveVideo[]> {
    return this.httpClient.get<LiveVideo[]>(`${this._apiBaseUrl}`)
      .pipe(catchError(this.handleError));
  }

}
