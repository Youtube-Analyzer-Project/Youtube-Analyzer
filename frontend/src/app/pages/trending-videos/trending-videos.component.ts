import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-trending-videos',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    TableComponent
  ],
  templateUrl: './trending-videos.component.html',
  styleUrl: './trending-videos.component.scss'
})
export class TrendingVideosComponent {

}
