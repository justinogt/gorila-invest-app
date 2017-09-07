import { Injectable } from '@angular/core';

import { WidgetItem } from '../data/widget-item';

// Widgets
import { SimpleWidgetComponent } from '../components/dashboard/widgets/simple-widget/simple-widget.component';

@Injectable()
export class WidgetsService {
  defaultHeaderWidgets: WidgetItem[] = [
    new WidgetItem(SimpleWidgetComponent, { size: 3 })
  ];

  defaultDashboardWidgets: WidgetItem[];

  constructor() { }

  getHeaderWidgets() {
    return new Promise<WidgetItem[]>(
      (res, rej) => res(this.defaultHeaderWidgets)
    );
  }

  getDashboardWidgets() {
    return new Promise<WidgetItem[]>(
      (res, rej) => res(this.defaultDashboardWidgets)
    );
  }
}
