import { Component, inject, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { LiveVideoDetailsService } from '../../services/live-video-details.service';
import { LiveVideo } from '../../types/live-video.type';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-top-video-card',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatChip,
    MatCardActions,
    DecimalPipe,
  ],
  templateUrl: './top-video-card.component.html',
  styleUrl: './top-video-card.component.scss',
})
export class TopVideoCardComponent {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  video = input.required<LiveVideo>();
  first = input<boolean>(false);
  second = input<boolean>(false);
  third = input<boolean>(false);

  getSentimentClass(score: number): string {
    if (score > 0.75) return 'positive-text';
    if (score > 0.25) return 'neutral-text';
    return 'negative-text';
  }

  getSentimentLabel(score: number): string {
    if (score > 0.75) return 'Positive';
    if (score > 0.25) return 'Neutral';
    return 'Negative';
  }

  collapseDetails(): void {
    this._liveVideoDetailsService.updateShowDetails(false);
    this._liveVideoDetailsService.updateVideo(this.video());
    this._liveVideoDetailsService.updateShowYoutubeButton(true);
  }
}
