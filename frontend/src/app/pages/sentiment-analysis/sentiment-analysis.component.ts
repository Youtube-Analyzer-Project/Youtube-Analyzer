import { Component, OnInit, inject, signal } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { Widget } from '../../types/dashboard.type';
import { DashboardService } from '../../services/dashboard.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: [WidgetComponent, MatToolbar],
  providers: [DashboardService],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.scss',
})
export class SentimentAnalysisComponent implements OnInit {
  private _dashboardService = inject(DashboardService);

  protected widgets = signal<Widget[]>([]);
  protected charts = signal<Widget[]>([]);

  ngOnInit(): void {
    this._getWidgets();
  }

  private _getWidgets(): void {
    this.widgets.set(this._dashboardService.getWidgets());
  }
}
