import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {CustomSidenavComponent} from './components/custom-sidenav/custom-sidenav.component';
import {YoutubeDataContentComponent} from './youtube-data-content/youtube-data-content.component';

@Component({
  selector: 'app-root',
  imports: [YoutubeDataContentComponent, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
