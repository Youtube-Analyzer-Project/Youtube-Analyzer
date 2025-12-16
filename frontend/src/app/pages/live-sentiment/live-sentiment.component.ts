import {Component, computed, OnInit} from '@angular/core';
import {TopVideosComponent} from './top-videos/top-videos.component';
import {VIDEOS} from './videos-mock';
import {LiveVideoListComponent} from './live-video-list/live-video-list.component';

@Component({
  selector: 'app-live-sentiment',
  imports: [
    TopVideosComponent,
    LiveVideoListComponent,
  ],
  templateUrl: './live-sentiment.component.html',
  styleUrl: './live-sentiment.component.scss'
})
export class LiveSentimentComponent implements OnInit {
  protected readonly VIDEOS = VIDEOS;
  protected activeStreams = computed(() => this.VIDEOS.slice(3));
  protected topVideos = computed(() => this.VIDEOS.slice(0, 3));

  ngOnInit() {
    console.log('LiveSentimentComponent initialized with', this.VIDEOS.length, 'videos.');
    console.log('Active Streams:', this.activeStreams());
    console.log('Top Videos:', this.topVideos());
  }
}
