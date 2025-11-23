import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-views-per-category',
  imports: [],
  templateUrl: './views-per-category.component.html',
  styleUrl: './views-per-category.component.scss'
})
export class ViewsPerCategoryComponent implements OnInit {

  // TODO: Replace with dynamic data

  protected chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'bar',
      data: {
        labels: ['Music', 'Tech', 'Gaming', 'Education', 'Comedy'],
        datasets: [
          {
            label: '',
            data: [23, 17, 27, 15, 22],
            backgroundColor: ['#36A2EB']
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
