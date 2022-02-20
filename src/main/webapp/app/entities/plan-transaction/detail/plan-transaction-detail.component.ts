import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanTransaction } from '../plan-transaction.model';

@Component({
  selector: 'jhi-plan-transaction-detail',
  templateUrl: './plan-transaction-detail.component.html',
})
export class PlanTransactionDetailComponent implements OnInit {
  planTransaction: IPlanTransaction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planTransaction }) => {
      this.planTransaction = planTransaction;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
