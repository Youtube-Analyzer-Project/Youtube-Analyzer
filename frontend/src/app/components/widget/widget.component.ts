import {Component, input} from '@angular/core';
import {Widget} from '../../types/dashboard.type';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-widget',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgComponentOutlet
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {
  data = input.required<Widget>();
}
