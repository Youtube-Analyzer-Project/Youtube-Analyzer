import {Component, inject, input} from '@angular/core';
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {LiveVideoDetailsService} from '../../../services/live-video-details.service';
import {LiveVideo} from '../../../types/live-video.type';

@Component({
  selector: 'app-top-video-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatChip,
    MatCardActions
  ],
  templateUrl: './top-video-card.component.html',
  styleUrl: './top-video-card.component.scss'
})
export class TopVideoCardComponent {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  video = input.required<LiveVideo>();
  first = input<boolean>(false);
  second = input<boolean>(false);
  third = input<boolean>(false);

  collapseDetails(): void {
    this._liveVideoDetailsService.updateShowDetails(false);
  }
}
