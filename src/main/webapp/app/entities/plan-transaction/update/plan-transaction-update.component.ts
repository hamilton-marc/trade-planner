import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IPlanTransaction, PlanTransaction } from '../plan-transaction.model';
import { PlanTransactionService } from '../service/plan-transaction.service';
import { ITradingPlan } from 'app/entities/trading-plan/trading-plan.model';
import { TradingPlanService } from 'app/entities/trading-plan/service/trading-plan.service';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

@Component({
  selector: 'jhi-plan-transaction-update',
  templateUrl: './plan-transaction-update.component.html',
})
export class PlanTransactionUpdateComponent implements OnInit {
  isSaving = false;
  orderStatusValues = Object.keys(OrderStatus);

  tradingPlansSharedCollection: ITradingPlan[] = [];

  editForm = this.fb.group({
    id: [],
    numberOfContracts: [],
    costPerContract: [],
    stopLoss: [],
    technicalStopLoss: [],
    timeStop: [],
    plannedEntryDate: [],
    plannedExitDate: [],
    entryReason: [],
    exitReason: [],
    orderStatus: [],
    tradingPlan: [],
  });

  constructor(
    protected planTransactionService: PlanTransactionService,
    protected tradingPlanService: TradingPlanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planTransaction }) => {
      if (planTransaction.id === undefined) {
        const today = dayjs().startOf('day');
        planTransaction.timeStop = today;
        planTransaction.plannedEntryDate = today;
        planTransaction.plannedExitDate = today;
      }

      this.updateForm(planTransaction);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planTransaction = this.createFromForm();
    if (planTransaction.id !== undefined) {
      this.subscribeToSaveResponse(this.planTransactionService.update(planTransaction));
    } else {
      this.subscribeToSaveResponse(this.planTransactionService.create(planTransaction));
    }
  }

  trackTradingPlanById(index: number, item: ITradingPlan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanTransaction>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(planTransaction: IPlanTransaction): void {
    this.editForm.patchValue({
      id: planTransaction.id,
      numberOfContracts: planTransaction.numberOfContracts,
      costPerContract: planTransaction.costPerContract,
      stopLoss: planTransaction.stopLoss,
      technicalStopLoss: planTransaction.technicalStopLoss,
      timeStop: planTransaction.timeStop ? planTransaction.timeStop.format(DATE_TIME_FORMAT) : null,
      plannedEntryDate: planTransaction.plannedEntryDate ? planTransaction.plannedEntryDate.format(DATE_TIME_FORMAT) : null,
      plannedExitDate: planTransaction.plannedExitDate ? planTransaction.plannedExitDate.format(DATE_TIME_FORMAT) : null,
      entryReason: planTransaction.entryReason,
      exitReason: planTransaction.exitReason,
      orderStatus: planTransaction.orderStatus,
      tradingPlan: planTransaction.tradingPlan,
    });

    this.tradingPlansSharedCollection = this.tradingPlanService.addTradingPlanToCollectionIfMissing(
      this.tradingPlansSharedCollection,
      planTransaction.tradingPlan
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tradingPlanService
      .query()
      .pipe(map((res: HttpResponse<ITradingPlan[]>) => res.body ?? []))
      .pipe(
        map((tradingPlans: ITradingPlan[]) =>
          this.tradingPlanService.addTradingPlanToCollectionIfMissing(tradingPlans, this.editForm.get('tradingPlan')!.value)
        )
      )
      .subscribe((tradingPlans: ITradingPlan[]) => (this.tradingPlansSharedCollection = tradingPlans));
  }

  protected createFromForm(): IPlanTransaction {
    return {
      ...new PlanTransaction(),
      id: this.editForm.get(['id'])!.value,
      numberOfContracts: this.editForm.get(['numberOfContracts'])!.value,
      costPerContract: this.editForm.get(['costPerContract'])!.value,
      stopLoss: this.editForm.get(['stopLoss'])!.value,
      technicalStopLoss: this.editForm.get(['technicalStopLoss'])!.value,
      timeStop: this.editForm.get(['timeStop'])!.value ? dayjs(this.editForm.get(['timeStop'])!.value, DATE_TIME_FORMAT) : undefined,
      plannedEntryDate: this.editForm.get(['plannedEntryDate'])!.value
        ? dayjs(this.editForm.get(['plannedEntryDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      plannedExitDate: this.editForm.get(['plannedExitDate'])!.value
        ? dayjs(this.editForm.get(['plannedExitDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      entryReason: this.editForm.get(['entryReason'])!.value,
      exitReason: this.editForm.get(['exitReason'])!.value,
      orderStatus: this.editForm.get(['orderStatus'])!.value,
      tradingPlan: this.editForm.get(['tradingPlan'])!.value,
    };
  }
}
