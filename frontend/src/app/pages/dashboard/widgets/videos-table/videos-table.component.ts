import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VideoItem, VideosListPaginated } from '../../../../types/dashboard-api.types';

@Component({
  selector: 'app-videos-table',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './videos-table.component.html',
  styleUrl: './videos-table.component.scss',
})
export class VideosTableComponent {
  @Input() paginated: VideosListPaginated | null = null;
  @Input() pageSize = 5;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() openVideo = new EventEmitter<VideoItem>();

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }

  onOpen(video: VideoItem): void {
    this.openVideo.emit(video);
  }

  onShare(video: VideoItem): void {
    const currentVideo = video;
    const url = `https://www.youtube.com/watch?v=${currentVideo.video_id}`;
    console.log('Sharing URL:', url);

    if (navigator.share) {
      navigator
        .share({
          title: currentVideo.title,
          text: `Check out this analysis for: ${currentVideo.title}`,
          url: url,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }
}
