import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITradingPlan, TradingPlan } from '../trading-plan.model';
import { TradingPlanService } from '../service/trading-plan.service';

import { TradingPlanRoutingResolveService } from './trading-plan-routing-resolve.service';

describe('TradingPlan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TradingPlanRoutingResolveService;
  let service: TradingPlanService;
  let resultTradingPlan: ITradingPlan | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(TradingPlanRoutingResolveService);
    service = TestBed.inject(TradingPlanService);
    resultTradingPlan = undefined;
  });

  describe('resolve', () => {
    it('should return ITradingPlan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTradingPlan = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTradingPlan).toEqual({ id: 123 });
    });

    it('should return new ITradingPlan if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTradingPlan = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTradingPlan).toEqual(new TradingPlan());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TradingPlan })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTradingPlan = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTradingPlan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
