import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanTransaction } from '../plan-transaction.model';
import { PlanTransactionService } from '../service/plan-transaction.service';
import { PlanTransactionDeleteDialogComponent } from '../delete/plan-transaction-delete-dialog.component';

@Component({
  selector: 'jhi-plan-transaction',
  templateUrl: './plan-transaction.component.html',
})
export class PlanTransactionComponent implements OnInit {
  planTransactions?: IPlanTransaction[];
  isLoading = false;

  constructor(protected planTransactionService: PlanTransactionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.planTransactionService.query().subscribe({
      next: (res: HttpResponse<IPlanTransaction[]>) => {
        this.isLoading = false;
        this.planTransactions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPlanTransaction): number {
    return item.id!;
  }

  delete(planTransaction: IPlanTransaction): void {
    const modalRef = this.modalService.open(PlanTransactionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.planTransaction = planTransaction;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
