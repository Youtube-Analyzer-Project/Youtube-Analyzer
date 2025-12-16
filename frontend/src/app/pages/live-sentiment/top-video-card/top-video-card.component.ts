import {Component, inject, input} from '@angular/core';
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {LiveVideoDetailsService} from '../../../services/live-video-details.service';

@Component({
  selector: 'app-top-video-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatChip,
    MatCardActions,
    MatIcon
  ],
  templateUrl: './top-video-card.component.html',
  styleUrl: './top-video-card.component.scss'
})
export class TopVideoCardComponent {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  first = input<boolean>(false);
  second = input<boolean>(false);
  third = input<boolean>(false);

  collapseDetails(): void {
    this._liveVideoDetailsService.updateShowDetails(false);
  }
}
