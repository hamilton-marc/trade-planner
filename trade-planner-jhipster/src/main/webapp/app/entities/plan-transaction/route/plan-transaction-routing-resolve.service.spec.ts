import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPlanTransaction, PlanTransaction } from '../plan-transaction.model';
import { PlanTransactionService } from '../service/plan-transaction.service';

import { PlanTransactionRoutingResolveService } from './plan-transaction-routing-resolve.service';

describe('PlanTransaction routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PlanTransactionRoutingResolveService;
  let service: PlanTransactionService;
  let resultPlanTransaction: IPlanTransaction | undefined;

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
    routingResolveService = TestBed.inject(PlanTransactionRoutingResolveService);
    service = TestBed.inject(PlanTransactionService);
    resultPlanTransaction = undefined;
  });

  describe('resolve', () => {
    it('should return IPlanTransaction returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanTransaction = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanTransaction).toEqual({ id: 123 });
    });

    it('should return new IPlanTransaction if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanTransaction = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPlanTransaction).toEqual(new PlanTransaction());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PlanTransaction })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanTransaction = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanTransaction).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
