import {Component, inject, OnInit, signal} from '@angular/core';
import {TopVideosComponent} from './top-videos/top-videos.component';
import {LiveVideoListComponent} from './live-video-list/live-video-list.component';
import {LiveSentimentApiService} from '../../services/live-sentiment-api.service';
import {LiveVideo} from '../../types/live-video.type';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-live-sentiment',
  imports: [
    TopVideosComponent,
    LiveVideoListComponent,
    MatProgressBar,
  ],
  templateUrl: './live-sentiment.component.html',
  styleUrl: './live-sentiment.component.scss'
})
export class LiveSentimentComponent implements OnInit {

  protected videos = signal<LiveVideo[]>([]);
  protected activeStreams = signal<LiveVideo[]>([]);
  protected topVideos = signal<LiveVideo[]>([]);
  private _liveSentimentApiService = inject(LiveSentimentApiService);

  ngOnInit(): void {
    this._fetchLiveVideos();
    // setInterval(() => {
    //   this._fetchLiveVideos();
    // }, 1500);
  }

  private _fetchLiveVideos(): void {
    this._liveSentimentApiService.getLiveVideos().subscribe((data) => {
      this.videos.set(data);

      this._getActiveStreams();
      this._getTopVideos();
    });
  }

  private _getActiveStreams(): void {
    this.activeStreams.set(this.videos().slice(3));
  }

  private _getTopVideos(): void {
    this.topVideos.set(this.videos().slice(0, 3));
  }

}
