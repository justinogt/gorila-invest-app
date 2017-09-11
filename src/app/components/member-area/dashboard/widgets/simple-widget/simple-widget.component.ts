import { Component, OnInit, Input } from '@angular/core';

import { WidgetComponent } from '../../../../../data/widget-component';

@Component({
  selector: 'app-simple-widget',
  templateUrl: './simple-widget.component.html',
  styleUrls: ['./simple-widget.component.css']
})
export class SimpleWidgetComponent extends WidgetComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
