import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { InvestmentType } from '../../../../enums/investment-type.enum';
import { IInvestment } from '../../../../interfaces/iinvestment';
import { PrivateTitle } from '../../../../data/investment/private-title';

import { UserService } from '../../../../services/user.service';
import { InvestmentsService } from '../../../../services/investments.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {

  tableMessage: string = "Carregando..."
  investments: IInvestment[] = [];

  private _subPrivateTitles: any;

  constructor(private investmentsService: InvestmentsService,
    private router: Router) {
    investmentsService.initialize()
      .then(() => {
        this._subPrivateTitles = this.investmentsService.afPrivateTitles
          .subscribe(privateTitles => {
            this.investments = [];
            for (let i = 0; i < privateTitles.length; i++)
              this.investments.push(privateTitles[i]);

            if (!this.hasAnyInvestment())
              this.tableMessage = "Nenhum investimento encontrado!";
          });

        investmentsService.userService.onUserLogoutEvent.push(() => this._subPrivateTitles.unsubscribe());
      });
  }

  hasAnyInvestment(): boolean {
    if (!this.investments) return false;
    return this.investments.length != 0;
  }

  openInvestment(investment: IInvestment) {
    this.router.navigate(["/member-area/investimentos/detail", investment.$key]);
  }
}
