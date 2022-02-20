import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TradingPlanService } from '../service/trading-plan.service';

import { TradingPlanComponent } from './trading-plan.component';

describe('TradingPlan Management Component', () => {
  let comp: TradingPlanComponent;
  let fixture: ComponentFixture<TradingPlanComponent>;
  let service: TradingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TradingPlanComponent],
    })
      .overrideTemplate(TradingPlanComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TradingPlanComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TradingPlanService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.tradingPlans?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
