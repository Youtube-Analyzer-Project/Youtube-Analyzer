import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoDialogData } from '../../types/dashboard-api.types';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { BackendVideoDetails } from '../../types/backend-api.types';
import { DecimalPipe, DatePipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe,
    DecimalPipe,
    MatChip,
  ],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss',
})
export class VideoDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<VideoDialogComponent>);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly api = inject(DashboardApiService);
  readonly data = inject<VideoDialogData>(MAT_DIALOG_DATA);

  safeUrl: SafeResourceUrl | null = null;
  details: BackendVideoDetails | null = null;
  loading = false;
  error: string | null = null;

  get hasDetails(): boolean {
    return this.details !== null;
  }

  get tags(): string[] {
    return this.details?.tags ?? [];
  }

  get hasTags(): boolean {
    return this.tags.length > 0;
  }

  get positiveHighlights() {
    return this.details?.highlights?.top_positive ?? [];
  }

  get negativeHighlights() {
    return this.details?.highlights?.top_negative ?? [];
  }

  getLabelClass(label: string | undefined): string {
    if (!label) return '';
    return label.toLowerCase().replace(/\s+/g, '-');
  }

  getSentimentClass(score: number): string {
    if (score < 0.25) return 'very-negative';
    if (score < 0.45) return 'negative';
    if (score < 0.55) return 'neutral';
    if (score < 0.75) return 'positive';
    return 'very-positive';
  }

  ngOnInit(): void {
    const url = `https://www.youtube.com/embed/${this.data.video.video_id}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.loadDetails();
  }

  private loadDetails(): void {
    this.loading = true;
    this.error = null;
    this.api.getVideoDetails(this.data.video.video_id).subscribe({
      next: (details) => {
        this.details = details;
        this.loading = false;
      },
      error: () => {
        this.error = "We couldn't load videos details.";
        this.loading = false;
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
