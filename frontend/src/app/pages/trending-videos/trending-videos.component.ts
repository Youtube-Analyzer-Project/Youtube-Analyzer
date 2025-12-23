import { Component, inject, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { YoutubeApiService } from '../../services/youtube-api-service';
import { VideoDialogComponent } from '../dashboard/widgets/video-dialog/video-dialog.component';
import { VideosTableComponent } from '../dashboard/widgets/videos-table/videos-table.component';
import { VideoItem, VideosListPaginated } from '../../types/dashboard-api.types';

@Component({
  selector: 'app-trending-videos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    VideosTableComponent,
  ],
  templateUrl: './trending-videos.component.html',
  styleUrl: './trending-videos.component.scss',
})
export class TrendingVideosComponent implements OnDestroy {
  private _youtubeApiService = inject(YoutubeApiService);
  private _dialog = inject(MatDialog);
  private _subscription: Subscription = new Subscription();

  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string>('');

  protected allVideos = signal<VideoItem[]>([]);

  protected pageSize = signal(10);
  protected pageIndex = signal(0);

  protected paginatedData = computed<VideosListPaginated>(() => {
    const all = this.allVideos();
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    const items = all.slice(startIndex, endIndex);

    return {
      sort_by: 'trending',
      current_page: this.pageIndex() + 1,
      total_pages: Math.ceil(all.length / this.pageSize()),
      items: items,
    };
  });

  getTrendingVideos() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this._subscription = this._youtubeApiService
      .getVideosByRegion()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: any) => {
          const rawItems = Array.isArray(response) ? response : response.items || [];

          const mappedItems: VideoItem[] = rawItems.map((item: any) => ({
            video_id: item.id || item._id,
            title: item.snippet?.title || 'Untitled',
            thumbnail_url: item.snippet?.thumbnails?.medium?.url || '',
            category_badge: item.snippet?.categoryId || 'General',
            channel_name: item.snippet?.channelTitle || 'Unknown Channel',
            published_at: item.snippet?.publishedAt || new Date().toISOString(),

            stats: {
              views: this.formatNumber(item.statistics?.viewCount),
              views_raw: Number(item.statistics?.viewCount) || 0,
              likes: this.formatNumber(item.statistics?.likeCount),
              sentiment_score: 0,
              sentiment_label: 'Not Analyzed',
            },
            ...item,
          }));

          this.allVideos.set(mappedItems);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set("Youtube Trending videos aren't available right now");
        },
      });
  }

  onViewDetails(video: VideoItem) {
    this._dialog.open(VideoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { video: video },
      autoFocus: false,
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  private formatNumber(num: any): string {
    if (!num) return '0';
    const n = Number(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
