import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanTransaction } from '../plan-transaction.model';
import { PlanTransactionService } from '../service/plan-transaction.service';

@Component({
  templateUrl: './plan-transaction-delete-dialog.component.html',
})
export class PlanTransactionDeleteDialogComponent {
  planTransaction?: IPlanTransaction;

  constructor(protected planTransactionService: PlanTransactionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planTransactionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
