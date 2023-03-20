import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingPlanDetailComponent } from './trading-plan-detail.component';

describe('TradingPlanDetailComponent', () => {
  let component: TradingPlanDetailComponent;
  let fixture: ComponentFixture<TradingPlanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TradingPlanDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
