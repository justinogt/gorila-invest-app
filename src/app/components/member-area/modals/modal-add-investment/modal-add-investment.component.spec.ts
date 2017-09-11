import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddInvestmentComponent } from './modal-add-investment.component';

describe('ModalAddInvestmentComponent', () => {
  let component: ModalAddInvestmentComponent;
  let fixture: ComponentFixture<ModalAddInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
