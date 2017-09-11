import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonyWidgetComponent } from './patrimony-widget.component';

describe('PatrimonyWidgetComponent', () => {
  let component: PatrimonyWidgetComponent;
  let fixture: ComponentFixture<PatrimonyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
