import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITradingPlan, TradingPlan } from '../trading-plan.model';
import { TradingPlanService } from '../service/trading-plan.service';

@Injectable({ providedIn: 'root' })
export class TradingPlanRoutingResolveService implements Resolve<ITradingPlan> {
  constructor(protected service: TradingPlanService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITradingPlan> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tradingPlan: HttpResponse<TradingPlan>) => {
          if (tradingPlan.body) {
            return of(tradingPlan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TradingPlan());
  }
}
