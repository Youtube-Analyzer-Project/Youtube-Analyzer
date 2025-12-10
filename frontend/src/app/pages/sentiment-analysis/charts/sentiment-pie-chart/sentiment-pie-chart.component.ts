import { Component, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sentiment-pie-chart',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './sentiment-pie-chart.component.html',
  styleUrl: './sentiment-pie-chart.component.scss',
})
export class SentimentPieChartComponent implements OnInit, OnDestroy {
  data = input.required<number[]>();

  protected chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            label: '',
            data: this.data(),
            backgroundColor: ['#DD4046', '#499F5A', '#F3BC24'],
            borderColor: '#1c1c1cff',
            borderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart().nativeElement.remove();
  }
}
