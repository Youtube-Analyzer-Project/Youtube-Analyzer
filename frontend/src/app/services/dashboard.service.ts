import {Injectable, signal} from '@angular/core';
import {Widget} from '../types/dashboard.type';
import {TrendingCountComponent} from '../pages/dashboard/widgets/trending-count/trending-count.component';
import {
  TrendingViewsCountComponent
} from '../pages/dashboard/widgets/trending-views-count/trending-views-count.component';
import {ViewsPerCategoryComponent} from '../pages/dashboard/widgets/views-per-category/views-per-category.component';

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
    },
    {
      id: 2,
      label: 'Views Per Category',
      content: ViewsPerCategoryComponent
    }
  ]);

  public getWidgets() {
    return this._widgets();
  }

}
