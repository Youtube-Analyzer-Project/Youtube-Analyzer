import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SentimentVideoDto } from '../../types/sentiment.types';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';

@Component({
  selector: 'app-video-list-item',
  imports: [CommonModule, MatIcon, FormatNumberPipe, MatButtonModule, MatIconModule],
  templateUrl: './video-list-item.component.html',
  styleUrl: './video-list-item.component.scss',
})
export class VideoListItemComponent {
  video = input.required<SentimentVideoDto>();

  getLabelClass(label: string): string {
    return label ? label.toLowerCase().replace(/\s+/g, '-') : '';
  }

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
