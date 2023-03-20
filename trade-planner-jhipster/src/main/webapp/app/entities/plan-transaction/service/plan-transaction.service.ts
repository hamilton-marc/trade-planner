import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlanTransaction, getPlanTransactionIdentifier } from '../plan-transaction.model';

export type EntityResponseType = HttpResponse<IPlanTransaction>;
export type EntityArrayResponseType = HttpResponse<IPlanTransaction[]>;

@Injectable({ providedIn: 'root' })
export class PlanTransactionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/plan-transactions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planTransaction: IPlanTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planTransaction);
    return this.http
      .post<IPlanTransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planTransaction: IPlanTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planTransaction);
    return this.http
      .put<IPlanTransaction>(`${this.resourceUrl}/${getPlanTransactionIdentifier(planTransaction) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(planTransaction: IPlanTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planTransaction);
    return this.http
      .patch<IPlanTransaction>(`${this.resourceUrl}/${getPlanTransactionIdentifier(planTransaction) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanTransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPlanTransactionToCollectionIfMissing(
    planTransactionCollection: IPlanTransaction[],
    ...planTransactionsToCheck: (IPlanTransaction | null | undefined)[]
  ): IPlanTransaction[] {
    const planTransactions: IPlanTransaction[] = planTransactionsToCheck.filter(isPresent);
    if (planTransactions.length > 0) {
      const planTransactionCollectionIdentifiers = planTransactionCollection.map(
        planTransactionItem => getPlanTransactionIdentifier(planTransactionItem)!
      );
      const planTransactionsToAdd = planTransactions.filter(planTransactionItem => {
        const planTransactionIdentifier = getPlanTransactionIdentifier(planTransactionItem);
        if (planTransactionIdentifier == null || planTransactionCollectionIdentifiers.includes(planTransactionIdentifier)) {
          return false;
        }
        planTransactionCollectionIdentifiers.push(planTransactionIdentifier);
        return true;
      });
      return [...planTransactionsToAdd, ...planTransactionCollection];
    }
    return planTransactionCollection;
  }

  protected convertDateFromClient(planTransaction: IPlanTransaction): IPlanTransaction {
    return Object.assign({}, planTransaction, {
      timeStop: planTransaction.timeStop?.isValid() ? planTransaction.timeStop.toJSON() : undefined,
      plannedEntryDate: planTransaction.plannedEntryDate?.isValid() ? planTransaction.plannedEntryDate.toJSON() : undefined,
      plannedExitDate: planTransaction.plannedExitDate?.isValid() ? planTransaction.plannedExitDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeStop = res.body.timeStop ? dayjs(res.body.timeStop) : undefined;
      res.body.plannedEntryDate = res.body.plannedEntryDate ? dayjs(res.body.plannedEntryDate) : undefined;
      res.body.plannedExitDate = res.body.plannedExitDate ? dayjs(res.body.plannedExitDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planTransaction: IPlanTransaction) => {
        planTransaction.timeStop = planTransaction.timeStop ? dayjs(planTransaction.timeStop) : undefined;
        planTransaction.plannedEntryDate = planTransaction.plannedEntryDate ? dayjs(planTransaction.plannedEntryDate) : undefined;
        planTransaction.plannedExitDate = planTransaction.plannedExitDate ? dayjs(planTransaction.plannedExitDate) : undefined;
      });
    }
    return res;
  }
}
