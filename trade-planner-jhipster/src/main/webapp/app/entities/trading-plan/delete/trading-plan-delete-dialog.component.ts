import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITradingPlan } from '../trading-plan.model';
import { TradingPlanService } from '../service/trading-plan.service';

@Component({
  templateUrl: './trading-plan-delete-dialog.component.html',
})
export class TradingPlanDeleteDialogComponent {
  tradingPlan?: ITradingPlan;

  constructor(protected tradingPlanService: TradingPlanService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tradingPlanService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
