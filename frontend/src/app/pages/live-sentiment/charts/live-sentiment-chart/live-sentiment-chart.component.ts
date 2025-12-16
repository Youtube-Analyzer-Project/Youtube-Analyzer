import {Component, effect, ElementRef, inject, input, OnDestroy, OnInit, signal, viewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {SentimentChartSeriesDto} from '../../../../types/sentiment.types';
import {Chart} from 'chart.js';
import {LiveSentimentHistoryDto} from '../../live-sentiment.types';
import {LiveVideoDetailsService} from '../../../../services/live-video-details.service';

@Component({
  selector: 'app-live-sentiment-chart',
  imports: [
  ],
  templateUrl: './live-sentiment-chart.component.html',
  styleUrl: './live-sentiment-chart.component.scss'
})
export class LiveSentimentChartComponent implements OnDestroy {
  private _liveVideoDetailsService = inject(LiveVideoDetailsService);
  dataset = input.required<LiveSentimentHistoryDto[]>();

  protected canvas = viewChild.required<ElementRef>('canvas');
  protected chart!: Chart;

  constructor() {
    effect(() => {
      if (this._liveVideoDetailsService.detailsChanged()) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.canvas().nativeElement, {
        type: 'line',
        data: {
          labels: this.dataset().map((point) => ''),
          datasets: [
            {
              label: '',
              data: this.dataset().map((point) => point.avg),
              borderColor: '#DD4046',
              backgroundColor: ['#DD4046'],
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 6,
            }
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
              min: 0,
              max: 1,
              ticks: {
                stepSize: 0.4,
              },
            },
          },
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.canvas().nativeElement.remove();
  }
}
