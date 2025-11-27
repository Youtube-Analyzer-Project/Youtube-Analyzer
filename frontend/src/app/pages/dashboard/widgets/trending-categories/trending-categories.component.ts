import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgClass } from '@angular/common';
import { TopCategoryCard } from '../../../../types/dashboard-api.types';

@Component({
  selector: 'app-trending-categories',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgFor, NgClass],
  templateUrl: './trending-categories.component.html',
  styleUrl: './trending-categories.component.scss',
})
export class TrendingCategoriesComponent {
  @Input() categories: TopCategoryCard[] = [];
  @Output() categorySelected = new EventEmitter<TopCategoryCard | null>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  selectedId: string | null = null;

  selectCategory(cat: TopCategoryCard) {
    this.selectedId = cat.category_id;
    this.categorySelected.emit(cat);
  }

  scrollLeft() {
  const el = this.scrollContainer?.nativeElement;
  if (!el) return;
  el.scrollBy({ left: -300, behavior: 'smooth' });
}
  scrollRight() {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 300, behavior: 'smooth' });
  }

  
}
