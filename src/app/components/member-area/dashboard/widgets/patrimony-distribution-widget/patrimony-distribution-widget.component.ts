import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { InvestmentsService } from '../../../../../services/investments.service';
import { InvestmentType } from '../../../../../enums/investment-type.enum';

@Component({
  selector: 'app-patrimony-distribution-widget',
  templateUrl: './patrimony-distribution-widget.component.html',
  styleUrls: ['./patrimony-distribution-widget.component.css']
})
export class PatrimonyDistributionWidgetComponent implements OnInit {
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

  chartLabels: Array<string> = ['Poupança', 'Títulos Privados'];
  chartData: Array<number> = [0, 0];
  chartOptions = {
    legend: {
      position: 'right'
    }
  };
  chartType:string = 'pie';

  isChartLoaded: boolean = false;
  private _amountDataToLoad: number = 2;

  constructor(private investmentService: InvestmentsService) {
    investmentService.afSavings.map(res => res).subscribe(savings => {
      var temp = this.chartData;
      temp[0] = savings.length;
      this.chartData = temp;

      console.log(this.chartData);
      this.chartLoaded();
    });
    investmentService.afPrivateTitles.map(res => res).subscribe(privateTitles => {
      var temp = this.chartData;
      temp[1] = privateTitles.length;
      this.chartData = temp;

      console.log(this.chartData);
      this.chartLoaded();
    });
  }

  ngOnInit() {
  }

  private chartLoaded() {

      // Transform data to %
      var sum: number = 0;
      for (let i = 0; i < this.chartData.length; i++)
        sum += this.chartData[i];

      for (let i = 0; i < this.chartData.length; i++)
        this.chartData[i] = Number((this.chartData[i] / sum * 100).toFixed(2));

      this.chart.ngOnChanges({});
  }
}
