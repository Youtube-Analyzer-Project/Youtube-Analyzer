import {Component, inject, OnInit} from '@angular/core';
import {YoutubeApiService} from '../services/youtube-api-service';

@Component({
  selector: 'app-youtube-data-content',
  imports: [],
  templateUrl: './youtube-data-content.html',
  styleUrl: './youtube-data-content.css'
})
export class YoutubeDataContent implements OnInit {
  private _youtubeApiService = inject(YoutubeApiService);

  ngOnInit(): void {
    this._youtubeApiService.getVideosByRegion().subscribe((data: any) => {
      console.log(data);
    });
  }
}
