import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../types/raw-video.type';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private _httpClient = inject(HttpClient);

  public getVideosByRegion(): Observable<{ message: string }> {
    return this._httpClient.get<{ message: string }>('http://localhost:8000/api/fetch_trending/');
  }

  public getRawVideos(): Observable<Video[]> {
    return this._httpClient.get<Video[]>('http://localhost:8000/api/get_trending/');
  }
}
