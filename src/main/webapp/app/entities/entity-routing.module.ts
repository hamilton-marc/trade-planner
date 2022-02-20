import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'trading-plan',
        data: { pageTitle: 'tradePlannerApp.tradingPlan.home.title' },
        loadChildren: () => import('./trading-plan/trading-plan.module').then(m => m.TradingPlanModule),
      },
      {
        path: 'plan-transaction',
        data: { pageTitle: 'tradePlannerApp.planTransaction.home.title' },
        loadChildren: () => import('./plan-transaction/plan-transaction.module').then(m => m.PlanTransactionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
