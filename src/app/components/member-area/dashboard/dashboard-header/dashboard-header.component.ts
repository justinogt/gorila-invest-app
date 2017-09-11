import { Component, OnInit } from '@angular/core';

import { WidgetsService } from '../../../../services/widgets.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(private widgetsService: WidgetsService) { }

  ngOnInit() {
    this.widgetsService.getHeaderWidgets().then((data) =>
      {

      });
  }

}
