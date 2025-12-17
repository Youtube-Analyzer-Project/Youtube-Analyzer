import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, signal, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TopCategoryCard } from '../../../../types/dashboard-api.types';
import {WidgetComponent} from '../../../../components/widget/widget.component';
import {Widget} from '../../../../types/sentiment.types';

@Component({
  selector: 'app-trending-categories',
  standalone: true,
  imports: [MatCardModule, MatIconModule, WidgetComponent],
  templateUrl: './trending-categories.component.html',
  styleUrl: './trending-categories.component.scss',
})
export class TrendingCategoriesComponent implements OnInit {
  @Input() categories: TopCategoryCard[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  selectedId: string | null = null;

  protected categoriesData = signal<Widget[]>([]);

  ngOnInit() {
    this.getWidgetData();
  }

  getWidgetData() {
    const widgets = this.categories.map((item, index) => this._getWidgetData(item, index));
    console.log(widgets);
    this.categoriesData.set(widgets);
  }

  private _getWidgetData(category: TopCategoryCard, index: number): Widget {
    const sentiment =
      category.sentiment_label === 'Positive'
        ? 'sentiment_satisfied'
        : category.sentiment_label === 'Negative'
          ? 'sentiment_dissatisfied'
          : 'sentiment_neutral';
    return {
      id: index,
      label: category.category_name,
      content: category.sentiment_label,
      details: `${category.videos_count} videos`,
      icon: sentiment
    }
  }

}
