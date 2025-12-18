import {Component, inject, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {LiveVideo} from '../../types/live-video.type';
import {LiveVideoDetailsService} from '../../services/live-video-details.service';

@Component({
  selector: 'app-live-video-item',
  imports: [
    MatIcon
  ],
  templateUrl: './live-video-item.component.html',
  styleUrl: './live-video-item.component.scss'
})
export class LiveVideoItemComponent {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  video = input.required<LiveVideo>();

  viewVideoDetails(): void {
    this._liveVideoDetailsService.updateShowDetails(false);
    this._liveVideoDetailsService.updateVideo(this.video());
    this._liveVideoDetailsService.updateShowYoutubeButton(false);
  }

}
