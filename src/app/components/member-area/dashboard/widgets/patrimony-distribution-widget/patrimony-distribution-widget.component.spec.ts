import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonyDistributionWidgetComponent } from './patrimony-distribution-widget.component';

describe('PatrimonyDistributionWidgetComponent', () => {
  let component: PatrimonyDistributionWidgetComponent;
  let fixture: ComponentFixture<PatrimonyDistributionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonyDistributionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonyDistributionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
