import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TrendingCategoriesComponent } from '../../components/trending-categories/trending-categories.component';
import { VideosTableComponent } from '../../components/videos-table/videos-table.component';
import { VideoDialogComponent } from '../../components/video-dialog/video-dialog.component';

import {
  TopCategoryCard,
  VideoItem,
  VideosListPaginated,
  VideoDialogData,
} from '../../types/dashboard-api.types';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchBarComponent, TrendingCategoriesComponent, VideosTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly dialog = inject(MatDialog);
  private readonly api = inject(DashboardApiService);

  trendingCategories: TopCategoryCard[] = [];
  videosPaginated: VideosListPaginated | null = null;

  loading = false;
  error: string | null = null;

  private searchTerm = '';
  private currentPage = 1;
  public pageSize = 5;

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.api.getDashboard(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (resp) => {
        this.trendingCategories = resp.top_categories_cards;
        this.videosPaginated = resp.videos_list_paginated;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard', err);
        this.error = 'An error occured wile loading data.';
        this.loading = false;
      },
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.pageSize = 5;
    this.loadDashboard();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDashboard();
  }

  onOpenVideo(video: VideoItem): void {
    this.dialog.open<VideoDialogComponent, VideoDialogData>(VideoDialogComponent, {
      width: '1000px',
      maxWidth: '100vw',
      data: { video },
      panelClass: 'video-dialog-panel',
    });
  }
}
