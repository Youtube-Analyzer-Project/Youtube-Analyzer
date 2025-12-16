import {Component} from '@angular/core';
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
export class LiveSentimentComponent {

  protected readonly VIDEOS = VIDEOS;
}
