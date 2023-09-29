import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'any-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

}
