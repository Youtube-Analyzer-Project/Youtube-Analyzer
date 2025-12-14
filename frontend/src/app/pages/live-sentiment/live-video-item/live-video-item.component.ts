import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {LiveVideo} from '../../../types/live-video.type';

@Component({
  selector: 'app-live-video-item',
  imports: [
    MatIcon
  ],
  templateUrl: './live-video-item.component.html',
  styleUrl: './live-video-item.component.scss'
})
export class LiveVideoItemComponent {
  video = input.required<LiveVideo>();

  onShare() {
    const currentVideo = this.video();
    const url = `https://www.youtube.com/watch?v=${currentVideo._id}`;
    console.log('Sharing URL:', url);

    if (navigator.share) {
      navigator
        .share({
          title: currentVideo.title,
          text: `Check out this analysis for: ${currentVideo.title}`,
          url: url,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }
}
