import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TradingPlanComponent } from '../list/trading-plan.component';
import { TradingPlanDetailComponent } from '../detail/trading-plan-detail.component';
import { TradingPlanUpdateComponent } from '../update/trading-plan-update.component';
import { TradingPlanRoutingResolveService } from './trading-plan-routing-resolve.service';

const tradingPlanRoute: Routes = [
  {
    path: '',
    component: TradingPlanComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TradingPlanDetailComponent,
    resolve: {
      tradingPlan: TradingPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TradingPlanUpdateComponent,
    resolve: {
      tradingPlan: TradingPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TradingPlanUpdateComponent,
    resolve: {
      tradingPlan: TradingPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tradingPlanRoute)],
  exports: [RouterModule],
})
export class TradingPlanRoutingModule {}
