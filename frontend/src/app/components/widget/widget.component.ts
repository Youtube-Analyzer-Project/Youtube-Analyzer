import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Widget } from '../../types/sentiment.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget',
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIcon],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  data = input.required<Widget>();

  getKpiClass(content: string): string {
  if (!content) return '';
  const text = content.toLowerCase();

  if (text.includes('very positive')) return 'very-positive';
  if (text.includes('very negative')) return 'very-negative';
  if (text.includes('positive')) return 'positive';
  if (text.includes('negative')) return 'negative';
  if (text.includes('neutral')) return 'neutral';

  if (text.includes('increasing')) return 'positive';
  if (text.includes('decreasing')) return 'negative';
  if (text.includes('stable')) return 'neutral';

  return '';
}
}
