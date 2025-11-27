import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { VideoItem } from '../videos-table/videos-table.component';

export interface VideoDialogData {
  video: VideoItem;
}

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss',
})
export class VideoDialogComponent {
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VideoDialogData,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<VideoDialogComponent>
  ) {
    // aici in viitor o sa primesti direct YT videoId
    const embedUrl = `https://www.youtube.com/embed/${data.video.video_id}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  close(): void {
    this.dialogRef.close();
  }
}
