import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPlansComponent } from './trading-plans.component';

describe('TradingPlansComponent', () => {
  let component: TradingPlansComponent;
  let fixture: ComponentFixture<TradingPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingPlansComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
