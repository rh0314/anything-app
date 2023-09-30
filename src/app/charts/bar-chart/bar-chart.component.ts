import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'any-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  title = 'ng2-charts-demo';
  data1 = [];
  data2 = [];
  years = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.years,
    datasets: [
      { data: this.data1, label: 'Series A' },
      { data: this.data2, label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor() {
    const max = parseInt(((Math.random() * 7) + 5).toString());
    for (let i = 0; i < max; i++) {
      this.data1.push(Math.random() * 100);
      this.data2.push(Math.random() * 100);
      this.years.push((2011 + i).toString());
    }

  }
}
