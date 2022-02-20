import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITradingPlan } from '../trading-plan.model';
import { TradingPlanService } from '../service/trading-plan.service';
import { TradingPlanDeleteDialogComponent } from '../delete/trading-plan-delete-dialog.component';

@Component({
  selector: 'jhi-trading-plan',
  templateUrl: './trading-plan.component.html',
})
export class TradingPlanComponent implements OnInit {
  tradingPlans?: ITradingPlan[];
  isLoading = false;

  constructor(protected tradingPlanService: TradingPlanService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tradingPlanService.query().subscribe({
      next: (res: HttpResponse<ITradingPlan[]>) => {
        this.isLoading = false;
        this.tradingPlans = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITradingPlan): number {
    return item.id!;
  }

  delete(tradingPlan: ITradingPlan): void {
    const modalRef = this.modalService.open(TradingPlanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tradingPlan = tradingPlan;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
