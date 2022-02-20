import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlanTransaction, PlanTransaction } from '../plan-transaction.model';
import { PlanTransactionService } from '../service/plan-transaction.service';

@Injectable({ providedIn: 'root' })
export class PlanTransactionRoutingResolveService implements Resolve<IPlanTransaction> {
  constructor(protected service: PlanTransactionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanTransaction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((planTransaction: HttpResponse<PlanTransaction>) => {
          if (planTransaction.body) {
            return of(planTransaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlanTransaction());
  }
}
