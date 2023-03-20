import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingPlansComponent } from './trading-plans.component';
import { TradingPlanDetailComponent } from './trading-plan-detail/trading-plan-detail.component';

const routes: Routes = [
  { path: 'trading-plans', component: TradingPlansComponent },
  { path: 'trading-plan', component: TradingPlanDetailComponent },
  { path: 'trading-plan/:id', component: TradingPlanDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingPlansRoutingModule {}
