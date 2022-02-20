import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlanTransactionComponent } from '../list/plan-transaction.component';
import { PlanTransactionDetailComponent } from '../detail/plan-transaction-detail.component';
import { PlanTransactionUpdateComponent } from '../update/plan-transaction-update.component';
import { PlanTransactionRoutingResolveService } from './plan-transaction-routing-resolve.service';

const planTransactionRoute: Routes = [
  {
    path: '',
    component: PlanTransactionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanTransactionDetailComponent,
    resolve: {
      planTransaction: PlanTransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanTransactionUpdateComponent,
    resolve: {
      planTransaction: PlanTransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanTransactionUpdateComponent,
    resolve: {
      planTransaction: PlanTransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(planTransactionRoute)],
  exports: [RouterModule],
})
export class PlanTransactionRoutingModule {}
