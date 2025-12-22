import { Component, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { SentimentChartSeriesDto } from '../../../../types/sentiment.types';
import { Chart, registerables, ChartConfiguration, ChartDataset } from 'chart.js';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

Chart.register(...registerables);

@Component({
  selector: 'app-sentiment-line-chart',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './sentiment-line-chart.component.html',
  styleUrl: './sentiment-line-chart.component.scss',
})
export class SentimentLineChartComponent implements OnInit, OnDestroy {
  dataset1 = input.required<SentimentChartSeriesDto[]>();
  dataset2 = input.required<SentimentChartSeriesDto[]>();
  dataset3 = input.required<SentimentChartSeriesDto[]>();

  protected chart = viewChild.required<ElementRef>('chart');
  private _chartInstance: Chart | null = null;

  ngOnInit(): void {
    const allPoints = [...this.dataset1(), ...this.dataset2(), ...this.dataset3()];

    const dynamicRange = this._generateDynamicDateRange(allPoints);
    const labels = dynamicRange.map((d) => this._formatLabel(d));

    const config: ChartConfiguration<'line', (number | null)[], string> = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          this._createDataset(this.dataset1(), '#DD4046', dynamicRange),
          this._createDataset(this.dataset2(), '#499F5A', dynamicRange),
          this._createDataset(this.dataset3(), '#F3BC24', dynamicRange),
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
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              maxTicksLimit: 6,
            },
            grace: '10%',
          },
        },
      },
    };

    this._chartInstance = new Chart(this.chart().nativeElement, config);
  }

  ngOnDestroy(): void {
    if (this._chartInstance) {
      this._chartInstance.destroy();
    }
  }

  private _createDataset(
    series: SentimentChartSeriesDto[],
    color: string,
    dateRange: Date[]
  ): ChartDataset<'line', (number | null)[]> {
    const dataMap = new Map(series.map((s) => [s.date.split('T')[0], s.avg_score]));

    const mappedData = dateRange.map((date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const localIsoDate = `${year}-${month}-${day}`;

      const val = dataMap.get(localIsoDate);
      return val !== undefined ? val : null;
    });

    return {
      label: '',
      data: mappedData,
      borderColor: color,
      backgroundColor: color,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      spanGaps: true,
    };
  }

  private _generateDynamicDateRange(allPoints: SentimentChartSeriesDto[]): Date[] {
    if (!allPoints.length) return this._generateFixedDateRange(7); // Fallback

    const timestamps = allPoints.map((p) => new Date(p.date).getTime());
    const minTime = Math.min(...timestamps);
    const maxTime = Math.max(...timestamps);

    const startDate = new Date(minTime);
    const endDate = new Date(maxTime);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const dates = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  private _generateFixedDateRange(n: number): Date[] {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates.push(d);
    }
    return dates;
  }

  private _formatLabel(d: Date): string {
    const day = d.getDate().toString().padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${day} ${monthNames[d.getMonth()]}`;
  }
}
