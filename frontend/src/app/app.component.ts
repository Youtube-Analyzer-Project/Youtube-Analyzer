import {Component, inject, signal} from '@angular/core';
import {YoutubeApiService} from './services/youtube-api-service';
import {YoutubeDataContent} from './youtube-data-content/youtube-data-content';

@Component({
  selector: 'app-root',
  imports: [
    YoutubeDataContent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
