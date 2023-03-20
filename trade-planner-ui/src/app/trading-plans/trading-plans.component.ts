//import * as _ from "lodash";
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { TradingPlan } from './model/trading-plan.model';
import { TradingPlansService } from './trading-plans.service';

@Component({
  selector: 'app-trading-plans',
  templateUrl: './trading-plans.component.html',
  styleUrls: ['./trading-plans.component.css']
})
export class TradingPlansComponent implements OnInit {
  tradingPlans: TradingPlan[];

  constructor(
    private router: Router,
    private tradingPlanService: TradingPlansService
  ) {}

  public ngOnInit() {
    this.refresh();
  }

  public refresh() {
    this.tradingPlanService.getTradingPlans().subscribe(
      (tradingPlans: TradingPlan[]) => {
        this.tradingPlans = tradingPlans;
//      this.tradingPlans = _.orderBy(this.tradingPlans, ['createdAt'], ['asc']);
      },
      (error: any) => console.log(error),
      () => {}
    );
  }

  public onNewTradingPlan() {
    this.router.navigateByUrl('/trading-plan');
  }
}
