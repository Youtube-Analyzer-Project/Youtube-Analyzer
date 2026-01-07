import { Component, inject, input } from '@angular/core';
import { MatCard, MatCardActions, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { LiveVideoDetailsService } from '../../services/live-video-details.service';
import { LiveVideo } from '../../types/live-video.type';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardImage, MatCardContent } from '@angular/material/card';
import { LiveVideoDetailsComponent } from '../live-video-details/live-video-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-top-video-card',
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    DecimalPipe,
    MatCardImage,
    MatCardContent,
    MatDialogModule,
  ],
  templateUrl: './top-video-card.component.html',
  styleUrl: './top-video-card.component.scss',
})
export class TopVideoCardComponent {
  private dialog = inject(MatDialog);
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  video = input.required<LiveVideo>();
  first = input<boolean>(false);
  second = input<boolean>(false);
  third = input<boolean>(false);
  readonly fallbackImage = 'youtube_placeholder.png';

  getSentimentClass(score: number): string {
    if (score < 0.25) return 'very-negative';
    if (score < 0.45) return 'negative';
    if (score < 0.55) return 'neutral';
    if (score < 0.75) return 'positive';
    return 'very-positive';
  }

  getSentimentLabel(score: number): string {
    if (score < 0.25) return 'Very Negative';
    if (score < 0.45) return 'Negative';
    if (score < 0.55) return 'Neutral';
    if (score < 0.75) return 'Positive';
    return 'Very Positive';
  }

  viewVideosDetails(): void {
    this._liveVideoDetailsService.updateVideo(this.video());
    this._liveVideoDetailsService.updateShowYoutubeButton(true);

    this.dialog.open(LiveVideoDetailsComponent, {
      width: '900px',
      maxWidth: '95vw',
      panelClass: 'video-dialog-panel',
    });
  }

  handleThumbnail() {
    return this.video().thumbnail ?? this.fallbackImage;
  }
}
