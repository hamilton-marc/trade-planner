import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TradingPlanComponent } from './list/trading-plan.component';
import { TradingPlanDetailComponent } from './detail/trading-plan-detail.component';
import { TradingPlanUpdateComponent } from './update/trading-plan-update.component';
import { TradingPlanDeleteDialogComponent } from './delete/trading-plan-delete-dialog.component';
import { TradingPlanRoutingModule } from './route/trading-plan-routing.module';

@NgModule({
  imports: [SharedModule, TradingPlanRoutingModule],
  declarations: [TradingPlanComponent, TradingPlanDetailComponent, TradingPlanUpdateComponent, TradingPlanDeleteDialogComponent],
  entryComponents: [TradingPlanDeleteDialogComponent],
})
export class TradingPlanModule {}
