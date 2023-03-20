import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITradingPlan, getTradingPlanIdentifier } from '../trading-plan.model';

export type EntityResponseType = HttpResponse<ITradingPlan>;
export type EntityArrayResponseType = HttpResponse<ITradingPlan[]>;

@Injectable({ providedIn: 'root' })
export class TradingPlanService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trading-plans');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tradingPlan: ITradingPlan): Observable<EntityResponseType> {
    return this.http.post<ITradingPlan>(this.resourceUrl, tradingPlan, { observe: 'response' });
  }

  update(tradingPlan: ITradingPlan): Observable<EntityResponseType> {
    return this.http.put<ITradingPlan>(`${this.resourceUrl}/${getTradingPlanIdentifier(tradingPlan) as number}`, tradingPlan, {
      observe: 'response',
    });
  }

  partialUpdate(tradingPlan: ITradingPlan): Observable<EntityResponseType> {
    return this.http.patch<ITradingPlan>(`${this.resourceUrl}/${getTradingPlanIdentifier(tradingPlan) as number}`, tradingPlan, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITradingPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITradingPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTradingPlanToCollectionIfMissing(
    tradingPlanCollection: ITradingPlan[],
    ...tradingPlansToCheck: (ITradingPlan | null | undefined)[]
  ): ITradingPlan[] {
    const tradingPlans: ITradingPlan[] = tradingPlansToCheck.filter(isPresent);
    if (tradingPlans.length > 0) {
      const tradingPlanCollectionIdentifiers = tradingPlanCollection.map(tradingPlanItem => getTradingPlanIdentifier(tradingPlanItem)!);
      const tradingPlansToAdd = tradingPlans.filter(tradingPlanItem => {
        const tradingPlanIdentifier = getTradingPlanIdentifier(tradingPlanItem);
        if (tradingPlanIdentifier == null || tradingPlanCollectionIdentifiers.includes(tradingPlanIdentifier)) {
          return false;
        }
        tradingPlanCollectionIdentifiers.push(tradingPlanIdentifier);
        return true;
      });
      return [...tradingPlansToAdd, ...tradingPlanCollection];
    }
    return tradingPlanCollection;
  }
}
