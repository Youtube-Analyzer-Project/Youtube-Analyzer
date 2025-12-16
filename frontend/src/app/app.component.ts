import {Component, effect, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import {DetailsSidenavComponent} from './components/details-sidenav/details-sidenav.component';
import {LiveVideoDetailsService} from './services/live-video-details.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    DetailsSidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  isDetailsSidenavCollapsed = signal<boolean>(false);
  isSidenavCollapsed = false;

  constructor() {
    effect(() => {
      this.isDetailsSidenavCollapsed.set(this._liveVideoDetailsService.getShowDetails());
    });
  }

  onSidenavCollapsedChange(collapsed: boolean) {
    this.isSidenavCollapsed = !!collapsed;
  }

  onSidenavDetailsChange(collapsed: boolean) {
    this.isDetailsSidenavCollapsed.set(collapsed);
    this._liveVideoDetailsService.updateShowDetails(collapsed);
  }

  getDetailsCollapsed(): boolean {
    return this._liveVideoDetailsService.getShowDetails();
  }
}
