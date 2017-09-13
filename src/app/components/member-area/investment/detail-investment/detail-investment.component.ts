import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseChartDirective } from 'ng2-charts';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { IInvestment } from '../../../../interfaces/iinvestment';
import { InvestmentType } from '../../../../enums/investment-type.enum';
import { InvestmentsService } from '../../../../services/investments.service';

@Component({
  selector: 'app-detail-investment',
  templateUrl: './detail-investment.component.html',
  styleUrls: ['./detail-investment.component.css']
})
export class DetailInvestmentComponent implements OnInit, OnDestroy {
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

  investment: IInvestment;
  chartData: Array<any> = [{ data: [], label: 'Retorno do CDI'}, { data: [], label: 'Meu Retorno'}];
  chartLabels: Array<any> = [];
  chartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  chartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(148,159,177,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
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

  chartButtonMessage: string = 'Mais detalhes';
  isChartLoaded: boolean = false;

  private _isChartSimpleDetail: boolean = true;
  private _cdi: any[];
  private _subInvestment: any;

  constructor(private activatedRoute: ActivatedRoute,
    private investmentsService: InvestmentsService,
    private http: Http, private router: Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) =>{
      this.isChartLoaded = false;
      let id = params.id;

      this._subInvestment = this.investmentsService.getInvestment(InvestmentType.PrivateTitle, id)
        .subscribe(investment => this.setInvestment(investment));
      this.investmentsService.userService.onUserLogoutEvent.push(() => {
        if (this._subInvestment)
          this._subInvestment.unsubscribe();
      });
    });
  }
  ngOnDestroy() {
    if (this._subInvestment)
      this._subInvestment.unsubscribe();
  }

  getInvestmentDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
  getInvestmentTypeName(type: InvestmentType) {
    switch(type) {
      case InvestmentType.Savings:
        return 'Poupança';
      case InvestmentType.PrivateTitle:
        return 'Títulos Privados';
    }
  }

  toggleChartDetail() {
    this._isChartSimpleDetail = !this._isChartSimpleDetail;
    this.updateChartData(this.getCDIData(this._isChartSimpleDetail));

    if (this._isChartSimpleDetail)
      this.chartButtonMessage = 'Mais detalhes';
    else
      this.chartButtonMessage = 'Simples';
  }

  removeInvestment(investment: IInvestment) {
    this.investmentsService.remove(investment);
    this.toastr.success(`Investimento (${investment.name}) removido com sucesso!`);
    this.router.navigate(['/member-area/investimentos']);
  }

  getCDIData(removeDuplicates: boolean) {
    if (removeDuplicates) {
      let newCDIs = [];
      for (let i = 0; i < this._cdi.length; i++) {
        let alreadyAdded: boolean = false;
        for (let i2 = 0; i2 < newCDIs.length; i2++) {
          if (this._cdi[i].Value == newCDIs[i2].Value) {
            alreadyAdded = true;
            break;
          }
        }

        if (!alreadyAdded) newCDIs.push(this._cdi[i]);
      }

      return newCDIs;
    }

    return this._cdi;
  }

  private setInvestment(investment: IInvestment) {
    this.investment = investment;

    this.http.get('https://cdb-exercise.herokuapp.com/api/MarketData')
      .map(res => res.json())
      .subscribe(cdis => {
        this._cdi = cdis;

        this.updateChartData(this.getCDIData(this._isChartSimpleDetail));
      });
  }

  private updateChartData(cdis: any[]) {
    this.chartData[0].data.length = 0;
    this.chartData[1].data.length = 0;
    this.chartLabels.length = 0;

    cdis.forEach((cdi, index) => {
      this.chartData[0].data.push(cdi.Value);
      this.chartData[1].data.push(Number((cdi.Value * this.investment.investmentReturn / 100).toFixed(2)));
      this.chartLabels.push(new Date(cdi.RefDate).toLocaleDateString());
    });

    setTimeout(() => {
      if (this.chart && this.chart.chart)
        this.chart.chart.update();
      this.isChartLoaded = true;
    }, 500);
  }
}
