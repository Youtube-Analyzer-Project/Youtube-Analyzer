import {Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {VideoListItemComponent} from '../../../components/video-list-item/video-list-item.component';
import {SentimentVideoDto} from '../../../types/sentiment.types';

@Component({
  selector: 'app-video-list',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    VideoListItemComponent
  ],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {
  title = input.required<string>();
  videos = input.required<SentimentVideoDto[]>();
}
