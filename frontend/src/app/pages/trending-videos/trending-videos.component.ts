import {Component, inject, OnDestroy, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {TableComponent} from '../../components/table/table.component';
import {YoutubeApiService} from '../../services/youtube-api-service';
import {Subscription} from 'rxjs';
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
  private _youtubeRawVideosSubscription: Subscription = new Subscription();

  protected isLoading = signal<boolean>(false);
  protected youtubeVideos = signal<Video[]>([]);
  protected displayedColumns: string[] = ['title', 'chanelTitle', 'viewCount', 'likeCount', 'commentCount'];

  protected getTrendingVideos() {
    this.isLoading.set(true);

    setTimeout(() => {
      this._youtubeVideosSubscription = this._youtubeApiService.getVideosByRegion().subscribe(() => {
        this._youtubeRawVideosSubscription = this._youtubeApiService.getRawVideos().subscribe((data) => {
          console.log(data);
          this.youtubeVideos.set(data);
        });
      });
      this.isLoading.set(false);
    }, 1500);
  }

  ngOnDestroy() {
    this._youtubeVideosSubscription.unsubscribe();
    this._youtubeRawVideosSubscription.unsubscribe();
  }

}
