import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

  constructor(private investmentsService: InvestmentsService,
    private router: Router, private toastr: ToastsManager) {
    investmentsService.initialize();

    this.investmentsService.privateTitles
      .subscribe(privateTitles => {
        this.investments = [];
        for (let i = privateTitles.length - 1; i >= 0; i--)
          this.investments.push(privateTitles[i]);

        if (!this.hasAnyInvestment())
          this.tableMessage = "Nenhum investimento encontrado!";
      });
  }

  hasAnyInvestment(): boolean {
    if (!this.investments) return false;
    return this.investments.length != 0;
  }

  getInvestmentDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
  getInvestmentTypeName(type: InvestmentType) {
    switch(type) {
      case InvestmentType.Savings:
        return 'Poupança';
      case InvestmentType.PrivateTitle:
        return 'Títulos Privados';
    }
  }

  openInvestment(investment: IInvestment) {
    this.router.navigate(["/member-area/investimentos/detail", investment.$key]);
  }

  removeInvestment(investment: IInvestment) {
    this.investmentsService.remove(investment);
    this.toastr.success(`Investimento (${investment.name}) removido com sucesso!`);
  }
}
