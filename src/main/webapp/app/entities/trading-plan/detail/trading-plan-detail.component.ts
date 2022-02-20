import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITradingPlan } from '../trading-plan.model';

@Component({
  selector: 'jhi-trading-plan-detail',
  templateUrl: './trading-plan-detail.component.html',
})
export class TradingPlanDetailComponent implements OnInit {
  tradingPlan: ITradingPlan | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tradingPlan }) => {
      this.tradingPlan = tradingPlan;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
