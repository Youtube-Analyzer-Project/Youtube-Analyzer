import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private _httpClient = inject(HttpClient);

  public getVideosByRegion(): any {
    return this._httpClient.get("http://localhost:8000/api/trending/");
  }
}
