import { Component, computed, input, signal } from '@angular/core';
import { LiveVideoItemComponent } from '../../../components/live-video-item/live-video-item.component';
import { LiveVideo } from '../../../types/live-video.type';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // 1. Import Paginator

@Component({
  selector: 'app-live-video-list',
  imports: [
    LiveVideoItemComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatPaginatorModule,
  ],
  templateUrl: './live-video-list.component.html',
  styleUrl: './live-video-list.component.scss',
})
export class LiveVideoListComponent {
  videos = input.required<LiveVideo[]>();

  pageIndex = signal(0);
  pageSize = signal(5);

  paginatedVideos = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.videos().slice(startIndex, endIndex);
  });

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}
