import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TrendingVideosComponent} from './pages/trending-videos/trending-videos.component';
import {SentimentAnalysisComponent} from './pages/sentiment-analysis/sentiment-analysis.component';
import {TopicTrendsComponent} from './pages/topic-trends/topic-trends.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'trending',
    component: TrendingVideosComponent
  },
  {
    path: 'sentiment',
    component: SentimentAnalysisComponent
  },
  {
    path: 'topics',
    component: TopicTrendsComponent
  }
];
