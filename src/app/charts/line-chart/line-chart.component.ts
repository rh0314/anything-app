import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType, Colors } from "chart.js";

@Component({
  selector: 'any-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  title = 'ng2-charts-demo';
  data = [];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: this.data,
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor() {

  }

  ngOnInit() {
    for(let i = 0; i < 7; i++) {
      this.data.push(Math.random() * 100);
    }
  }
}
