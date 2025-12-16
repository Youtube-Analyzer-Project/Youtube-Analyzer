import {Component, effect, inject, output, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatTabNavPanel} from '@angular/material/tabs';
import {LiveVideoDetailsService} from '../../services/live-video-details.service';
import {LiveVideo} from '../../types/live-video.type';

@Component({
  selector: 'app-details-sidenav',
  imports: [
    MatIcon,
    MatTabNavPanel
  ],
  templateUrl: './details-sidenav.component.html',
  styleUrl: './details-sidenav.component.scss',
  host: { '[class.collapsed]': 'isCollapsed()' }
})
export class DetailsSidenavComponent {
  private _dashboardDetailsService = inject(LiveVideoDetailsService);
  collapseDetails = output<boolean>();
  isCollapsed = signal<boolean>(false);
  video = signal<LiveVideo | null>(null);

  constructor() {
    effect(() => {
      this.isCollapsed.set(this._dashboardDetailsService.getShowDetails());
      this.video.set(this._dashboardDetailsService.getVideo());
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed.set(!this.isCollapsed());
    this.collapseDetails.emit(this.isCollapsed());
    this._dashboardDetailsService.updateShowDetails(this.isCollapsed());
  }

  getIsCollapsed(): boolean {
    return this._dashboardDetailsService.getShowDetails();
  }
}
