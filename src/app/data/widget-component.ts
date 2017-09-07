import { Input } from '@angular/core';

import { IWidget } from '../interfaces/iwidget';

export class WidgetComponent implements IWidget {
  @Input() name: string;
  @Input() data: any;
}
