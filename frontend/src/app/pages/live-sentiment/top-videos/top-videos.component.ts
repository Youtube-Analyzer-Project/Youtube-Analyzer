import {Component, input} from '@angular/core';
import {LiveVideo} from '../../../types/live-video.type';
import {TopVideoCardComponent} from '../top-video-card/top-video-card.component';

@Component({
  selector: 'app-top-videos',
  imports: [
    TopVideoCardComponent,
  ],
  templateUrl: './top-videos.component.html',
  styleUrl: './top-videos.component.scss'
})
export class TopVideosComponent {
  videos = input.required<LiveVideo[]>();
}
