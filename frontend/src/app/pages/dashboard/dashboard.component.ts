import {Component, inject, OnInit, signal} from '@angular/core';
import {WidgetComponent} from '../../components/widget/widget.component';
import {Widget} from '../../types/dashboard.type';
import {DashboardService} from '../../services/dashboard.service';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    WidgetComponent,
    MatToolbar
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
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
