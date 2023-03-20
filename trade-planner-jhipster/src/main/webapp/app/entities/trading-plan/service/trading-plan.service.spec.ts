import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TrendOutlook } from 'app/entities/enumerations/trend-outlook.model';
import { ITradingPlan, TradingPlan } from '../trading-plan.model';

import { TradingPlanService } from './trading-plan.service';

describe('TradingPlan Service', () => {
  let service: TradingPlanService;
  let httpMock: HttpTestingController;
  let elemDefault: ITradingPlan;
  let expectedResult: ITradingPlan | ITradingPlan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TradingPlanService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      underlying: 'AAAAAAA',
      underlyingDescription: 'AAAAAAA',
      underlyingOutlook: TrendOutlook.Unclear,
      underlyingOutlookOtherDesc: 'AAAAAAA',
      underlyingTrend: 'AAAAAAA',
      marketOutlook: TrendOutlook.Unclear,
      marketOutlookOtherDesc: 'AAAAAAA',
      marketTrend: 'AAAAAAA',
      timeFrame: 'AAAAAAA',
      strategy: 'AAAAAAA',
      notes: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a TradingPlan', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TradingPlan()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TradingPlan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          underlying: 'BBBBBB',
          underlyingDescription: 'BBBBBB',
          underlyingOutlook: 'BBBBBB',
          underlyingOutlookOtherDesc: 'BBBBBB',
          underlyingTrend: 'BBBBBB',
          marketOutlook: 'BBBBBB',
          marketOutlookOtherDesc: 'BBBBBB',
          marketTrend: 'BBBBBB',
          timeFrame: 'BBBBBB',
          strategy: 'BBBBBB',
          notes: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TradingPlan', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          underlying: 'BBBBBB',
          underlyingDescription: 'BBBBBB',
          underlyingTrend: 'BBBBBB',
          marketOutlookOtherDesc: 'BBBBBB',
          marketTrend: 'BBBBBB',
          timeFrame: 'BBBBBB',
          strategy: 'BBBBBB',
        },
        new TradingPlan()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TradingPlan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          underlying: 'BBBBBB',
          underlyingDescription: 'BBBBBB',
          underlyingOutlook: 'BBBBBB',
          underlyingOutlookOtherDesc: 'BBBBBB',
          underlyingTrend: 'BBBBBB',
          marketOutlook: 'BBBBBB',
          marketOutlookOtherDesc: 'BBBBBB',
          marketTrend: 'BBBBBB',
          timeFrame: 'BBBBBB',
          strategy: 'BBBBBB',
          notes: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a TradingPlan', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTradingPlanToCollectionIfMissing', () => {
      it('should add a TradingPlan to an empty array', () => {
        const tradingPlan: ITradingPlan = { id: 123 };
        expectedResult = service.addTradingPlanToCollectionIfMissing([], tradingPlan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tradingPlan);
      });

      it('should not add a TradingPlan to an array that contains it', () => {
        const tradingPlan: ITradingPlan = { id: 123 };
        const tradingPlanCollection: ITradingPlan[] = [
          {
            ...tradingPlan,
          },
          { id: 456 },
        ];
        expectedResult = service.addTradingPlanToCollectionIfMissing(tradingPlanCollection, tradingPlan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TradingPlan to an array that doesn't contain it", () => {
        const tradingPlan: ITradingPlan = { id: 123 };
        const tradingPlanCollection: ITradingPlan[] = [{ id: 456 }];
        expectedResult = service.addTradingPlanToCollectionIfMissing(tradingPlanCollection, tradingPlan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tradingPlan);
      });

      it('should add only unique TradingPlan to an array', () => {
        const tradingPlanArray: ITradingPlan[] = [{ id: 123 }, { id: 456 }, { id: 18069 }];
        const tradingPlanCollection: ITradingPlan[] = [{ id: 123 }];
        expectedResult = service.addTradingPlanToCollectionIfMissing(tradingPlanCollection, ...tradingPlanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tradingPlan: ITradingPlan = { id: 123 };
        const tradingPlan2: ITradingPlan = { id: 456 };
        expectedResult = service.addTradingPlanToCollectionIfMissing([], tradingPlan, tradingPlan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tradingPlan);
        expect(expectedResult).toContain(tradingPlan2);
      });

      it('should accept null and undefined values', () => {
        const tradingPlan: ITradingPlan = { id: 123 };
        expectedResult = service.addTradingPlanToCollectionIfMissing([], null, tradingPlan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tradingPlan);
      });

      it('should return initial array if no TradingPlan is added', () => {
        const tradingPlanCollection: ITradingPlan[] = [{ id: 123 }];
        expectedResult = service.addTradingPlanToCollectionIfMissing(tradingPlanCollection, undefined, null);
        expect(expectedResult).toEqual(tradingPlanCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
