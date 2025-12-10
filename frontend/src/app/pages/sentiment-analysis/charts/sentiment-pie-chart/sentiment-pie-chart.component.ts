import {Component, ElementRef, input, OnDestroy, OnInit, viewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {SentimentChartSeriesDto} from '../../../../types/sentiment.types';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-sentiment-pie-chart',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './sentiment-pie-chart.component.html',
  styleUrl: './sentiment-pie-chart.component.scss'
})
export class SentimentPieChartComponent implements OnInit, OnDestroy {
  data = input.required<number[]>();

  protected chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'pie',
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            label: '',
            data: this.data(),
            backgroundColor: ['#eb3636', '#3dff00', '#efba00'],
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.chart().nativeElement.remove();
  }
}
