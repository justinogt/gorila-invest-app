import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { InvestmentType } from '../../../../enums/investment-type.enum';
import { ModalAddInvestmentComponent } from '../../modals/modal-add-investment/modal-add-investment.component';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.component.html',
  styleUrls: ['./add-investment.component.css']
})
export class AddInvestmentComponent {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openPrivateTitle() {
    this.bsModalRef = this.modalService.show(ModalAddInvestmentComponent);
    this.bsModalRef.content.title = "Adicione um Título Privado";
    this.bsModalRef.content.type = InvestmentType.PrivateTitle;
    this.bsModalRef.content.list = [InvestmentType.PrivateTitle];
  }
}
