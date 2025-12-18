import {Component, input} from '@angular/core';
import {LiveVideoItemComponent} from '../../../components/live-video-item/live-video-item.component';
import {LiveVideo} from '../../../types/live-video.type';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-live-video-list',
  imports: [
    LiveVideoItemComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
  ],
  templateUrl: './live-video-list.component.html',
  styleUrl: './live-video-list.component.scss'
})
export class LiveVideoListComponent {
  videos = input.required<LiveVideo[]>();
}
