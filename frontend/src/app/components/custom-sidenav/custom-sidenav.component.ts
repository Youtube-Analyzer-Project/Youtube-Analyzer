import {Component, signal, Output, EventEmitter, inject} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkButtonComponent } from '../dark-button/dark-button.component';
import { MenuItem } from '../../types/custom-sidenav.types';
import {LiveVideoDetailsService} from '../../services/live-video-details.service';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    DarkButtonComponent,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
  host: { '[class.collapsed]': 'isCollapsed()' },
})
export class CustomSidenavComponent {
  private liveVideoDetailsService = inject(LiveVideoDetailsService);
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsed = signal<boolean>(false);
  menuItem = signal<MenuItem[]>([
    { id: 1, icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { id: 2, icon: 'trending_up', label: 'Trending Videos', route: 'trending' },
    { id: 3, icon: 'mood', label: 'Sentiment Analysis', route: 'sentiment' },
    { id: 4, icon: 'analytics', label: 'Topics & Trends', route: 'topics' },
  ]);

  toggleCollapsed(): void {
    this.isCollapsed.set(!this.isCollapsed());
    this.collapsedChange.emit(this.isCollapsed());
  }

  resetServices(): void {
    this.liveVideoDetailsService.updateShowDetails(true);
  }
}
