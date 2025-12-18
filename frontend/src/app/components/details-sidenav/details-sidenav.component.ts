import {Component, effect, inject, output, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatTabNavPanel} from '@angular/material/tabs';
import {LiveVideoDetailsService} from '../../services/live-video-details.service';
import {LiveVideo} from '../../types/live-video.type';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-details-sidenav',
  imports: [
    MatIcon,
    MatTabNavPanel,
    MatCard,
    MatCardContent,
    MatChip
  ],
  templateUrl: './details-sidenav.component.html',
  styleUrl: './details-sidenav.component.scss',
  host: { '[class.collapsed]': 'isCollapsed()' }
})
export class DetailsSidenavComponent {
  private liveVideoDetailsService = inject(LiveVideoDetailsService);
  collapseDetails = output<boolean>();
  isCollapsed = signal<boolean>(false);
  video = signal<LiveVideo | null>(null);
  showYoutubeButton = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isCollapsed.set(this.liveVideoDetailsService.getShowDetails());
      this.video.set(this.liveVideoDetailsService.getVideo());
      this.showYoutubeButton.set(this.liveVideoDetailsService.showYoutubeButton())
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed.set(!this.isCollapsed());
    this.collapseDetails.emit(this.isCollapsed());
    this.liveVideoDetailsService.updateShowDetails(this.isCollapsed());
    this.liveVideoDetailsService.notifyDetailsChanged();
  }

  getIsCollapsed(): boolean {
    return this.liveVideoDetailsService.getShowDetails();
  }
}
