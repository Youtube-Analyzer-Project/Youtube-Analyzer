import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VideoStats, VideoItem, VideosListPaginated } from '../../../../types/dashboard-api.types';

@Component({
  selector: 'app-videos-table',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './videos-table.component.html',
  styleUrl: './videos-table.component.scss',
})
export class VideosTableComponent {
  @Input() paginated: VideosListPaginated | null = null;

  // pentru backend mai tarziu
  @Output() pageChange = new EventEmitter<number>();
  @Output() openVideo = new EventEmitter<VideoItem>();

  onPageChange(event: PageEvent): void {
    const newPage = event.pageIndex + 1; // paginator e 0-based, noi vrem 1-based
    this.pageChange.emit(newPage);
  }

  onOpen(video: VideoItem): void {
    this.openVideo.emit(video);
  }
}
