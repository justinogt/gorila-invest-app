import { Component, OnDestroy } from '@angular/core';

import { InvestmentsService } from '../../../../../services/investments.service';

@Component({
  selector: 'app-patrimony-widget',
  templateUrl: './patrimony-widget.component.html',
  styleUrls: ['./patrimony-widget.component.css']
})
export class PatrimonyWidgetComponent implements OnDestroy {

  patrimony: number = 0;

  private _subAccount: any;

  constructor(private investmentsService: InvestmentsService) {
    investmentsService.initialize()
      .then(() => {
        this._subAccount = investmentsService.afAccount
          .subscribe((acc) => this.patrimony = acc.patrimony || 0);
      });
  }

  ngOnDestroy() {
    this._subAccount.unsubscribe();
  }
}
