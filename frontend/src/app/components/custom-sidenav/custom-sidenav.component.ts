import {Component, computed, input, signal} from '@angular/core';
import {MenuItem} from './custom-sidenav.types';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
  menuItem = signal<MenuItem[]>([
    { id: 1, icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { id: 2, icon: 'trending_up', label: 'Trending Videos', route: 'trending' },
    { id: 3, icon: 'sentiment_satisfied_alt', label: 'Sentiment Analysis', route: 'sentiment' },
    { id: 4, icon: 'analytics', label: 'Topics & Trends', route: 'topics' },
  ]);
}
