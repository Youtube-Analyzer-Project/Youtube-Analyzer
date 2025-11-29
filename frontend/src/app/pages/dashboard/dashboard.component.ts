import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchBarComponent } from './widgets/search-bar/search-bar.component';
import { TrendingCategoriesComponent } from './widgets/trending-categories/trending-categories.component';
import { VideosTableComponent } from './widgets/videos-table/videos-table.component';
import { VideoDialogComponent } from './widgets/video-dialog/video-dialog.component';

import {
  TopCategoryCard,
  VideoItem,
  VideosListPaginated,
  VideoDialogData,
} from '../../types/dashboard-api.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchBarComponent, TrendingCategoriesComponent, VideosTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly dialog = inject(MatDialog);

  trendingCategories: TopCategoryCard[] = [
    {
      category_id: '10',
      category_name: 'Music',
      icon_type: 'music_note',
      videos_count: 450,
      avg_sentiment_score: 85,
      sentiment_label: 'Very Positive',
      total_views: '15.2M',
      trend_indicator: 'up',
    },
    {
      category_id: '20',
      category_name: 'Gaming',
      icon_type: 'gamepad',
      videos_count: 320,
      avg_sentiment_score: 62,
      sentiment_label: 'Neutral',
      total_views: '8.5M',
      trend_indicator: 'flat',
    },
    {
      category_id: '25',
      category_name: 'News & Politics',
      icon_type: 'newspaper',
      videos_count: 210,
      avg_sentiment_score: 35,
      sentiment_label: 'Negative',
      total_views: '12.1M',
      trend_indicator: 'down',
    },
    {
      category_id: '17',
      category_name: 'Sports',
      icon_type: 'trophy',
      videos_count: 180,
      avg_sentiment_score: 78,
      sentiment_label: 'Positive',
      total_views: '5.4M',
      trend_indicator: 'up',
    },
    {
      category_id: '22',
      category_name: 'People & Blogs',
      icon_type: 'group',
      videos_count: 140,
      avg_sentiment_score: 55,
      sentiment_label: 'Neutral',
      total_views: '2.3M',
      trend_indicator: 'flat',
    },
  ];

  videosPaginated: VideosListPaginated = {
    sort_by: 'views_desc',
    current_page: 1,
    total_pages: 15,
    items: [
      {
        video_id: 'ko70cExuzZM',
        title: 'Taylor Swift - The Fate of Ophelia',
        thumbnail_url: 'https://i.ytimg.com/vi/ko70cExuzZM/mqdefault.jpg',
        category_badge: 'Music',
        channel_name: 'Taylor Swift',
        published_at: '2025-10-06',
        stats: {
          views: '138M',
          views_raw: 645013,
          likes: '2M',
          sentiment_score: 85,
          sentiment_label: 'Positive',
        },
      },
      {
        video_id: 'X-algikO_lo',
        title: 'Claudiu Gherguț câștigă Chefi la cuțite, sezonul 15!',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Entertainment',
        channel_name: 'Chefi la cuțite',
        published_at: '2025-05-29',
        stats: {
          views: '183K',
          views_raw: 520000,
          likes: '2.6K',
          sentiment_score: 60,
          sentiment_label: 'Neutral',
        },
      },
      {
        video_id: 'I_6zAkwQVKo',
        title: 'Donald Trump Certified as Next President of the United States',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'News',
        channel_name: 'C-SPAN',
        published_at: '2025-01-06',
        stats: {
          views: '289K',
          views_raw: 480000,
          likes: '3.2K',
          sentiment_score: 25,
          sentiment_label: 'Negative',
        },
      },
      {
        video_id: 'J0Mhw11bTYA',
        title: 'Football Manager 26 | Official Launch Trailer',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Gaming',
        channel_name: 'Football Manager',
        published_at: '2025-11-04',
        stats: {
          views: '679K',
          views_raw: 310000,
          likes: '2.2K',
          sentiment_score: 92,
          sentiment_label: 'Very Positive',
        },
      },
      {
        video_id: 'RTat_1kACh8',
        title: 'Best Goals of the Year 2025',
        thumbnail_url: 'https://via.placeholder.com/150',
        category_badge: 'Sports',
        channel_name: 'MNXHD',
        published_at: '2025-04-13',
        stats: {
          views: '1.9M',
          views_raw: 900000,
          likes: '10K',
          sentiment_score: 88,
          sentiment_label: 'Positive',
        },
      },
    ],
  };

  onSearchChange(term: string): void {
    console.log('search term:', term);
  }

  onCategorySelected(cat: TopCategoryCard | null): void {
    console.log('category selected:', cat);
  }

  onPageChange(page: number): void {
    console.log('Change to page:', page);
  }

  onOpenVideo(video: VideoItem): void {
    console.log('Open video dialog for:', video.video_id);

    this.dialog.open<VideoDialogComponent, VideoDialogData>(VideoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: { video },
      panelClass: 'video-dialog-panel',
    });
  }
}
