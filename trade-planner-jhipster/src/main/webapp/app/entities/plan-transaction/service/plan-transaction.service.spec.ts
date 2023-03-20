import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { IPlanTransaction, PlanTransaction } from '../plan-transaction.model';

import { PlanTransactionService } from './plan-transaction.service';

describe('PlanTransaction Service', () => {
  let service: PlanTransactionService;
  let httpMock: HttpTestingController;
  let elemDefault: IPlanTransaction;
  let expectedResult: IPlanTransaction | IPlanTransaction[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlanTransactionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      numberOfContracts: 0,
      costPerContract: 0,
      stopLoss: 0,
      technicalStopLoss: 0,
      timeStop: currentDate,
      plannedEntryDate: currentDate,
      plannedExitDate: currentDate,
      entryReason: 'AAAAAAA',
      exitReason: 'AAAAAAA',
      orderStatus: OrderStatus.Planned,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          timeStop: currentDate.format(DATE_TIME_FORMAT),
          plannedEntryDate: currentDate.format(DATE_TIME_FORMAT),
          plannedExitDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a PlanTransaction', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          timeStop: currentDate.format(DATE_TIME_FORMAT),
          plannedEntryDate: currentDate.format(DATE_TIME_FORMAT),
          plannedExitDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStop: currentDate,
          plannedEntryDate: currentDate,
          plannedExitDate: currentDate,
        },
        returnedFromService
      );

      service.create(new PlanTransaction()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PlanTransaction', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numberOfContracts: 1,
          costPerContract: 1,
          stopLoss: 1,
          technicalStopLoss: 1,
          timeStop: currentDate.format(DATE_TIME_FORMAT),
          plannedEntryDate: currentDate.format(DATE_TIME_FORMAT),
          plannedExitDate: currentDate.format(DATE_TIME_FORMAT),
          entryReason: 'BBBBBB',
          exitReason: 'BBBBBB',
          orderStatus: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStop: currentDate,
          plannedEntryDate: currentDate,
          plannedExitDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PlanTransaction', () => {
      const patchObject = Object.assign(
        {
          costPerContract: 1,
          stopLoss: 1,
          timeStop: currentDate.format(DATE_TIME_FORMAT),
          plannedEntryDate: currentDate.format(DATE_TIME_FORMAT),
          plannedExitDate: currentDate.format(DATE_TIME_FORMAT),
          exitReason: 'BBBBBB',
        },
        new PlanTransaction()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          timeStop: currentDate,
          plannedEntryDate: currentDate,
          plannedExitDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PlanTransaction', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numberOfContracts: 1,
          costPerContract: 1,
          stopLoss: 1,
          technicalStopLoss: 1,
          timeStop: currentDate.format(DATE_TIME_FORMAT),
          plannedEntryDate: currentDate.format(DATE_TIME_FORMAT),
          plannedExitDate: currentDate.format(DATE_TIME_FORMAT),
          entryReason: 'BBBBBB',
          exitReason: 'BBBBBB',
          orderStatus: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStop: currentDate,
          plannedEntryDate: currentDate,
          plannedExitDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a PlanTransaction', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPlanTransactionToCollectionIfMissing', () => {
      it('should add a PlanTransaction to an empty array', () => {
        const planTransaction: IPlanTransaction = { id: 123 };
        expectedResult = service.addPlanTransactionToCollectionIfMissing([], planTransaction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planTransaction);
      });

      it('should not add a PlanTransaction to an array that contains it', () => {
        const planTransaction: IPlanTransaction = { id: 123 };
        const planTransactionCollection: IPlanTransaction[] = [
          {
            ...planTransaction,
          },
          { id: 456 },
        ];
        expectedResult = service.addPlanTransactionToCollectionIfMissing(planTransactionCollection, planTransaction);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PlanTransaction to an array that doesn't contain it", () => {
        const planTransaction: IPlanTransaction = { id: 123 };
        const planTransactionCollection: IPlanTransaction[] = [{ id: 456 }];
        expectedResult = service.addPlanTransactionToCollectionIfMissing(planTransactionCollection, planTransaction);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planTransaction);
      });

      it('should add only unique PlanTransaction to an array', () => {
        const planTransactionArray: IPlanTransaction[] = [{ id: 123 }, { id: 456 }, { id: 4230 }];
        const planTransactionCollection: IPlanTransaction[] = [{ id: 123 }];
        expectedResult = service.addPlanTransactionToCollectionIfMissing(planTransactionCollection, ...planTransactionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planTransaction: IPlanTransaction = { id: 123 };
        const planTransaction2: IPlanTransaction = { id: 456 };
        expectedResult = service.addPlanTransactionToCollectionIfMissing([], planTransaction, planTransaction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planTransaction);
        expect(expectedResult).toContain(planTransaction2);
      });

      it('should accept null and undefined values', () => {
        const planTransaction: IPlanTransaction = { id: 123 };
        expectedResult = service.addPlanTransactionToCollectionIfMissing([], null, planTransaction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planTransaction);
      });

      it('should return initial array if no PlanTransaction is added', () => {
        const planTransactionCollection: IPlanTransaction[] = [{ id: 123 }];
        expectedResult = service.addPlanTransactionToCollectionIfMissing(planTransactionCollection, undefined, null);
        expect(expectedResult).toEqual(planTransactionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
