import {effect, Injectable, signal} from '@angular/core';
import {LiveVideo} from '../types/live-video.type';

@Injectable({
  providedIn: 'root',
})
export class LiveVideoDetailsService {
  private _showDetails = signal<boolean>(true);
  private _video = signal<LiveVideo | null>(null);
  private _detailsChanged = signal<boolean>(false);

  public updateShowDetails(showDetails: boolean): void {
    this._showDetails.set(showDetails);
  }

  public getShowDetails(): boolean {
    return this._showDetails();
  }

  public updateVideo(video: LiveVideo): void {
    this._video.set(video);
  }

  public getVideo(): LiveVideo | null {
    return this._video();
  }

  public notifyDetailsChanged(): void {
    this._detailsChanged.set(true);
  }

  public detailsChanged() {
    return this._detailsChanged();
  }

}
