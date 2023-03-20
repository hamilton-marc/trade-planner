import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanTransactionComponent } from './list/plan-transaction.component';
import { PlanTransactionDetailComponent } from './detail/plan-transaction-detail.component';
import { PlanTransactionUpdateComponent } from './update/plan-transaction-update.component';
import { PlanTransactionDeleteDialogComponent } from './delete/plan-transaction-delete-dialog.component';
import { PlanTransactionRoutingModule } from './route/plan-transaction-routing.module';

@NgModule({
  imports: [SharedModule, PlanTransactionRoutingModule],
  declarations: [
    PlanTransactionComponent,
    PlanTransactionDetailComponent,
    PlanTransactionUpdateComponent,
    PlanTransactionDeleteDialogComponent,
  ],
  entryComponents: [PlanTransactionDeleteDialogComponent],
})
export class PlanTransactionModule {}
