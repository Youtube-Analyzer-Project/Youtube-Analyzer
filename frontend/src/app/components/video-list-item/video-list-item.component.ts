import {Component, input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {SentimentVideoDto} from '../../types/sentiment.types';
import {FormatNumberPipe} from '../../pipes/format-number.pipe';

@Component({
  selector: 'app-video-list-item',
  imports: [
    MatIcon,
    FormatNumberPipe,
  ],
  templateUrl: './video-list-item.component.html',
  styleUrl: './video-list-item.component.scss'
})
export class VideoListItemComponent {
  video = input.required<SentimentVideoDto>();
}
