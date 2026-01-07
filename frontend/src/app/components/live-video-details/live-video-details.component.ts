import { Component, effect, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DecimalPipe, CommonModule } from '@angular/common';
import { LiveVideoDetailsService } from '../../services/live-video-details.service';
import { LiveVideo } from '../../types/live-video.type';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

interface CommentItem {
  text: string;
  truncated: string;
  expanded: boolean;
  needsTruncate: boolean;
}

@Component({
  selector: 'app-live-video-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DecimalPipe,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './live-video-details.component.html',
  styleUrl: './live-video-details.component.scss',
})
export class LiveVideoDetailsComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly service = inject(LiveVideoDetailsService);
  private readonly dialogRef = inject(MatDialogRef<LiveVideoDetailsComponent>);

  video = signal<LiveVideo | null>(null);
  safeUrl = signal<SafeResourceUrl | null>(null);
  showYoutubeButton = signal<boolean>(false);

  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  comments: CommentItem[] = [];

  private readonly truncateLength = 80;

  constructor() {
    effect(() => {
      const v = this.service.getVideo();

      this.video.set(v);
      this.showYoutubeButton.set(this.service.showYoutubeButton());

      if (v?._id) {
        this.safeUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v._id}`)
        );
        this.loading.set(false);

        // prepare comments
        this.comments = (v.comments?.slice(0, 10) ?? []).map((c) => {
          const needsTruncate = c.length > this.truncateLength;
          return {
            text: c,
            truncated: needsTruncate ? c.slice(0, this.truncateLength) + '...' : c,
            expanded: false,
            needsTruncate,
          };
        });
      } else {
        this.loading.set(true);
      }
    });
  }

  youtubeUrl(): string {
    return `https://www.youtube.com/watch?v=${this.video()!._id}`;
  }

  getSentimentClass(score: number): string {
    if (score < 0.25) return 'very-negative';
    if (score < 0.45) return 'negative';
    if (score < 0.55) return 'neutral';
    if (score < 0.75) return 'positive';
    return 'very-positive';
  }

  toggleComment(index: number) {
    this.comments[index].expanded = !this.comments[index].expanded;
  }

  close() {
    this.dialogRef.close();
  }
}
