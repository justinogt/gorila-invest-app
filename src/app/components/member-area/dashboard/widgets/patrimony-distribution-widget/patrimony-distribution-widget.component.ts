import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { InvestmentsService } from '../../../../../services/investments.service';
import { InvestmentType } from '../../../../../enums/investment-type.enum';
import { IInvestment } from '../../../../../interfaces/iinvestment';

@Component({
  selector: 'app-patrimony-distribution-widget',
  templateUrl: './patrimony-distribution-widget.component.html',
  styleUrls: ['./patrimony-distribution-widget.component.css']
})
export class PatrimonyDistributionWidgetComponent {
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

  chartLabels: Array<string> = ['Títulos Privados'];
  chartData: Array<number> = [0];
  chartColor: Array <any> = [{
     backgroundColor: ['rgba(118,183,41,0.5)'],
  }];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'right'
    }
  };
  chartType:string = 'pie';

  private _patrimonyDistribution: number[] = [0];

  constructor(private investmentsService: InvestmentsService) {
    investmentsService.initialize();

    investmentsService.privateTitles.subscribe(privateTitles => {
      this._patrimonyDistribution[0] = this.calculatePatrimony(privateTitles);
      this.calculatePatrimonyPercentage();
    });
  }

  private calculatePatrimony(investments: IInvestment[]): number {
    var sum = 0;
    for (let i = 0; i < investments.length; i++)
      sum += investments[i].value;
    return sum;
  }

  private calculatePatrimonyPercentage() {
    var sum = 0;
    for (let i = 0; i < this._patrimonyDistribution.length; i++)
      sum += this._patrimonyDistribution[i];

    for (let i = 0; i < this._patrimonyDistribution.length; i++)
      this.chartData[i] = Number((this._patrimonyDistribution[i] / sum * 100).toFixed(2));

    setTimeout(() => {
      if (this.chart && this.chart.chart)
        this.chart.chart.update();
    }, 250);
    ;
  }
}
