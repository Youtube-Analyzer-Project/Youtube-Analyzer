import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { VideoDialogData } from '../../../../types/dashboard-api.types';

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss',
})
export class VideoDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<VideoDialogComponent>);
  private readonly sanitizer = inject(DomSanitizer);
  readonly data = inject<VideoDialogData>(MAT_DIALOG_DATA);

  safeUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    const url = `https://www.youtube.com/embed/${this.data.video.video_id}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  close(): void {
    this.dialogRef.close();
  }
}
