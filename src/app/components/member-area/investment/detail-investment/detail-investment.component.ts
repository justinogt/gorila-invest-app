import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { IInvestment } from '../../../../interfaces/iinvestment';
import { InvestmentType } from '../../../../enums/investment-type.enum';
import { InvestmentsService } from '../../../../services/investments.service';

@Component({
  selector: 'app-detail-investment',
  templateUrl: './detail-investment.component.html',
  styleUrls: ['./detail-investment.component.css']
})
export class DetailInvestmentComponent implements OnInit {

  investment: IInvestment;
  chartData: Array<any> = [{ data: [], label: 'CDI'}, { data: [], label: 'Investimento'}];
  chartLabels: Array<any> = [];
  chartOptions:any = {
    responsive: true
  };
  chartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(118,183,41,0.2)',
      borderColor: 'rgba(118,183,41,1)',
      pointBackgroundColor: 'rgba(169,183,41,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  chartLegend:boolean = true;
  chartType:string = 'line';

  isChartLoaded: boolean = false;

  private _cdi: any[];
  private _subInvestment: any;

  constructor(private activatedRoute: ActivatedRoute,
    private investmentsService: InvestmentsService,
    private http: Http) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this._subInvestment = this.investmentsService.getInvestment(InvestmentType.PrivateTitle, id)
      .subscribe(investment => this.setInvestment(investment));
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  private setInvestment(investment: IInvestment) {
    this.investment = investment;

    this.http.get('https://cdb-exercise.herokuapp.com/api/MarketData')
      .map(res => res.json())
      .subscribe(cdis => this.loadedAllCDIs(cdis));
  }

  private loadedAllCDIs(cdis: any[]) {
    cdis.forEach((cdi, index) => {
      this.chartData[0].data.push(cdi.Value);
      this.chartData[1].data.push(cdi.Value * this.investment.investmentReturn / 100);
      this.chartLabels.push(new Date(cdi.RefDate).toLocaleDateString());
    });

    this.isChartLoaded = true;
  }
}
