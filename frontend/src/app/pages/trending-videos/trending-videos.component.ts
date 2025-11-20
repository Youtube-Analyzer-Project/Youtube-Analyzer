import {Component, inject, OnDestroy, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {TableComponent} from '../../components/table/table.component';
import {YoutubeApiService} from '../../services/youtube-api-service';
import {Subscription} from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators';
import {Video} from '../../types/raw-video.type';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-trending-videos',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    TableComponent,
    MatProgressBar,
  ],
  templateUrl: './trending-videos.component.html',
  styleUrl: './trending-videos.component.scss'
})
export class TrendingVideosComponent implements OnDestroy {
  private _youtubeApiService = inject(YoutubeApiService);
  private _youtubeVideosSubscription: Subscription = new Subscription();

  protected isLoading = signal<boolean>(false);
  protected youtubeVideos = signal<Video[]>([]);
  protected displayedColumns: string[] = ['title', 'channelTitle', 'viewCount', 'likeCount', 'commentCount'];

  protected getTrendingVideos() {
    this.isLoading.set(true);

    this._youtubeVideosSubscription = this._youtubeApiService.getVideosByRegion().pipe(
      switchMap(() => this._youtubeApiService.getRawVideos()),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (data: Video[]) => {
        console.log(data);
        this.youtubeVideos.set(data);
      },
      error: (error: Error) => {
        console.error('Error fetching trending videos:', error);
      }
    });
  }

  ngOnDestroy() {
    this._youtubeVideosSubscription.unsubscribe();
  }

}
