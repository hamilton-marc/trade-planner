import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TradingPlansRoutingModule } from './trading-plans-routing.module';
import { TradingPlansComponent } from './trading-plans.component';
import { TradingPlanDetailComponent } from './trading-plan-detail/trading-plan-detail.component';
import { TradingPlansService } from './trading-plans.service';
import { InMemoryDataService } from '../in-memory-data.service';

@NgModule({
  declarations: [TradingPlansComponent, TradingPlanDetailComponent],
  imports: [
    CommonModule,
    TradingPlansRoutingModule,
//  FormsModule,
    ReactiveFormsModule
  ],
  providers: [TradingPlansService, InMemoryDataService]
})
export class TradingPlansModule {}
