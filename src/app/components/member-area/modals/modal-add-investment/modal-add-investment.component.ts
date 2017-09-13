import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { InvestmentType } from '../../../../enums/investment-type.enum';
import { IInvestment } from '../../../../interfaces/iinvestment';
import { Savings } from '../../../../data/investment/savings';
import { PrivateTitle } from '../../../../data/investment/private-title';

import { InvestmentsService } from '../../../../services/investments.service';

@Component({
  selector: 'app-modal-add-investment',
  templateUrl: './modal-add-investment.component.html',
  styleUrls: ['./modal-add-investment.component.css']
})
export class ModalAddInvestmentComponent implements OnInit {
  InvestmentType = InvestmentType;

  public title: string;
  public type: number = InvestmentType.Savings;
  public list: any[];

  investment: IInvestment;

  constructor(public bsModalRef: BsModalRef, private investmentsService: InvestmentsService,
    private toastr: ToastsManager, private router: Router) { }

  ngOnInit() {
    this.createNewInvestment(InvestmentType.Savings);

    // Wait a moment to check the type, type is passed from bootstrap modal
    setTimeout(() => {
      this.createNewInvestment(this.type);
    }, 100);
  }

  addInvestment() {
    this.investmentsService.add(this.investment)
      .then((newInvestment) => {
        this.bsModalRef.hide();

        this.toastr.onClickToast()
          .subscribe(toast => {
            var data = toast.data as any;
            if (data)
              this.router.navigate(["/member-area/investimentos/detail", data.key]);
          });
        this.toastr.success(`Investimento (${this.investment.name}) inserido com sucesso!`, '', { data: { key: newInvestment.key }});
      });
  }

  private createNewInvestment(type: InvestmentType) {
    switch (type) {
      case InvestmentType.Savings:
        this.investment = new Savings("", 0);
        break;
      case InvestmentType.PrivateTitle:
        this.investment = new PrivateTitle("", "", 0, 0);
        break;
    }
  }
}
