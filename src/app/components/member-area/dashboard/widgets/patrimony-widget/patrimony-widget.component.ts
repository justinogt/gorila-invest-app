import { Component } from '@angular/core';

import { InvestmentsService } from '../../../../../services/investments.service';

@Component({
  selector: 'app-patrimony-widget',
  templateUrl: './patrimony-widget.component.html',
  styleUrls: ['./patrimony-widget.component.css']
})
export class PatrimonyWidgetComponent {

  patrimony: number = 0;

  constructor(private investmentsService: InvestmentsService) {
    investmentsService.initialize();
    investmentsService.patrimony.subscribe(patrimony => this.patrimony = patrimony);
  }
}
