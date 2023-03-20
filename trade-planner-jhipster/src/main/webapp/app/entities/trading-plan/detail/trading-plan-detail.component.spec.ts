import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TradingPlanDetailComponent } from './trading-plan-detail.component';

describe('TradingPlan Management Detail Component', () => {
  let comp: TradingPlanDetailComponent;
  let fixture: ComponentFixture<TradingPlanDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradingPlanDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tradingPlan: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TradingPlanDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TradingPlanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tradingPlan on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tradingPlan).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
