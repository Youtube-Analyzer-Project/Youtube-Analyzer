import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from '../../components/table/table.component';
import { YoutubeApiService } from '../../services/youtube-api-service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-trending-videos',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TableComponent, MatProgressBarModule, MatToolbarModule],
  templateUrl: './trending-videos.component.html',
  styleUrl: './trending-videos.component.scss',
})
export class TrendingVideosComponent implements OnDestroy {
  private _youtubeApiService = inject(YoutubeApiService);
  private _youtubeVideosSubscription: Subscription = new Subscription();

  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string>('');
  protected youtubeVideos = signal<any[]>([]);

  protected displayedColumns: string[] = [
    'title',
    'channelTitle',
    'viewCount',
    'likeCount',
    'commentCount',
  ];

  protected getTrendingVideos() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.youtubeVideos.set([]);

    this._youtubeVideosSubscription = this._youtubeApiService
      .getVideosByRegion()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data: any[]) => {
          const mappedData = data.map((item) => ({
            title: item.snippet?.title,
            channelTitle: item.snippet?.channelTitle,
            viewCount: item.statistics?.viewCount,
            likeCount: item.statistics?.likeCount,
            commentCount: item.statistics?.commentCount,
          }));

          console.log('Mapped Trending Data:', mappedData);
          this.youtubeVideos.set(mappedData);
        },
        error: (error: Error) => {
          console.error('Error fetching trending videos:', error);
          this.errorMessage.set("Youtube Trending videos aren't available right now");
        },
      });
  }

  ngOnDestroy() {
    this._youtubeVideosSubscription.unsubscribe();
  }
}
