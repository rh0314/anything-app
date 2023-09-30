import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'any-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  title = 'ng2-charts-demo';
  data = [];
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDatasets = [{
    data: this.data
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.data.push(Math.random() * 1000);
      if (i > 2) {
        this.pieChartLabels.push(`Random Thing #${i}`);
      }
    }
  }

}
