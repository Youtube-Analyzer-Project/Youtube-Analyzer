import { Component, inject, input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LiveVideo } from '../../types/live-video.type';
import { LiveVideoDetailsComponent } from '../live-video-details/live-video-details.component';
import { LiveVideoDetailsService } from '../../services/live-video-details.service';

@Component({
  selector: 'app-live-video-item',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './live-video-item.component.html',
  styleUrl: './live-video-item.component.scss',
})
export class LiveVideoItemComponent {
  private dialog = inject(MatDialog);
  private liveVideoService = inject(LiveVideoDetailsService);

  video = input.required<LiveVideo>();

  viewVideoDetails(): void {
    this.liveVideoService.updateVideo(this.video());
    this.liveVideoService.updateShowYoutubeButton(true);
    this.liveVideoService.updateShowDetails(true);

    this.dialog.open(LiveVideoDetailsComponent, {
      width: '900px',
      maxWidth: '95vw',
      panelClass: 'video-dialog-panel',
    });
  }
}
