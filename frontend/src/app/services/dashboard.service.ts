import {Injectable, signal} from '@angular/core';
import {Widget} from '../types/dashboard.type';
import {TrendingCountComponent} from '../pages/dashboard/widgets/trending-count/trending-count.component';
import {
  TrendingViewsCountComponent
} from '../pages/dashboard/widgets/trending-views-count/trending-views-count.component';

@Injectable()
export class DashboardService {

  private _widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Trending Videos',
      content: TrendingCountComponent
    },
    {
      id: 2,
      label: 'Total Views',
      content: TrendingViewsCountComponent
    }
  ]);

  public getWidgets() {
    return this._widgets();
  }

}
