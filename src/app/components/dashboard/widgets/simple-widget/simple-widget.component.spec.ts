import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWidgetComponent } from './simple-widget.component';

describe('SimpleWidgetComponent', () => {
  let component: SimpleWidgetComponent;
  let fixture: ComponentFixture<SimpleWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
