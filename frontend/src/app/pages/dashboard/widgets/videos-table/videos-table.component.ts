import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';




// poti muta astea intr-un fisier de tipuri separat daca vrei
export interface VideoStats {
  views: string;
  views_raw: number;
  likes: string;
  sentiment_score: number;
  sentiment_label: string;
}

export interface VideoItem {
  video_id: string;
  title: string;
  thumbnail_url: string;
  category_badge: string;
  channel_name: string;
  published_at: string;
  stats: VideoStats;
}

export interface VideosListPaginated {
  sort_by: string;
  current_page: number;
  total_pages: number;
  items: VideoItem[];
}

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
