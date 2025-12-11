import { Component, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { SentimentChartSeriesDto } from '../../../../types/sentiment.types';
import { Chart, registerables } from 'chart.js';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

Chart.register(...registerables);

@Component({
  selector: 'app-sentiment-line-chart',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './sentiment-line-chart.component.html',
  styleUrl: './sentiment-line-chart.component.scss',
})
export class SentimentLineChartComponent implements OnInit, OnDestroy {
  dataset1 = input.required<SentimentChartSeriesDto[]>();
  dataset2 = input.required<SentimentChartSeriesDto[]>();
  dataset3 = input.required<SentimentChartSeriesDto[]>();

  protected chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: this._getLast7Days(),
        datasets: [
          {
            label: '',
            data: this.dataset1().map((point) => point.avg_score),
            borderColor: '#DD4046',
            backgroundColor: ['#DD4046'],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
          {
            label: '',
            data: this.dataset2().map((point) => point.avg_score),
            borderColor: '#499F5A',
            backgroundColor: ['#499F5A'],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
          {
            label: '',
            data: this.dataset3().map((point) => point.avg_score),
            borderColor: '#F3BC24',
            backgroundColor: ['#F3BC24'],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: -1,
            max: 2,
            ticks: {
              stepSize: 0.5,
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart().nativeElement.remove();
  }

  _getLast7Days(): string[] {
    const result: string[] = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const day = d.getDate().toString().padStart(2, '0');

      const monthNames = [
        'Ian',
        'Feb',
        'Mar',
        'Apr',
        'Mai',
        'Iun',
        'Iul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const month = monthNames[d.getMonth()];

      result.push(`${day} ${month}`);
    }

    return result.reverse();
  }
}
