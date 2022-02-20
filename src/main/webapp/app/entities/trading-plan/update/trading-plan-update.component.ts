import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITradingPlan, TradingPlan } from '../trading-plan.model';
import { TradingPlanService } from '../service/trading-plan.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { TrendOutlook } from 'app/entities/enumerations/trend-outlook.model';

@Component({
  selector: 'jhi-trading-plan-update',
  templateUrl: './trading-plan-update.component.html',
})
export class TradingPlanUpdateComponent implements OnInit {
  isSaving = false;
  trendOutlookValues = Object.keys(TrendOutlook);

  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
    underlying: [null, [Validators.required, Validators.minLength(1)]],
    underlyingDescription: [],
    underlyingOutlook: [],
    underlyingOutlookOtherDesc: [],
    underlyingTrend: [],
    marketOutlook: [],
    marketOutlookOtherDesc: [],
    marketTrend: [],
    timeFrame: [],
    strategy: [],
    notes: [],
    user: [],
  });

  constructor(
    protected tradingPlanService: TradingPlanService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tradingPlan }) => {
      this.updateForm(tradingPlan);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tradingPlan = this.createFromForm();
    if (tradingPlan.id !== undefined) {
      this.subscribeToSaveResponse(this.tradingPlanService.update(tradingPlan));
    } else {
      this.subscribeToSaveResponse(this.tradingPlanService.create(tradingPlan));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITradingPlan>>): void {
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

  protected updateForm(tradingPlan: ITradingPlan): void {
    this.editForm.patchValue({
      id: tradingPlan.id,
      name: tradingPlan.name,
      underlying: tradingPlan.underlying,
      underlyingDescription: tradingPlan.underlyingDescription,
      underlyingOutlook: tradingPlan.underlyingOutlook,
      underlyingOutlookOtherDesc: tradingPlan.underlyingOutlookOtherDesc,
      underlyingTrend: tradingPlan.underlyingTrend,
      marketOutlook: tradingPlan.marketOutlook,
      marketOutlookOtherDesc: tradingPlan.marketOutlookOtherDesc,
      marketTrend: tradingPlan.marketTrend,
      timeFrame: tradingPlan.timeFrame,
      strategy: tradingPlan.strategy,
      notes: tradingPlan.notes,
      user: tradingPlan.user,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, tradingPlan.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): ITradingPlan {
    return {
      ...new TradingPlan(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      underlying: this.editForm.get(['underlying'])!.value,
      underlyingDescription: this.editForm.get(['underlyingDescription'])!.value,
      underlyingOutlook: this.editForm.get(['underlyingOutlook'])!.value,
      underlyingOutlookOtherDesc: this.editForm.get(['underlyingOutlookOtherDesc'])!.value,
      underlyingTrend: this.editForm.get(['underlyingTrend'])!.value,
      marketOutlook: this.editForm.get(['marketOutlook'])!.value,
      marketOutlookOtherDesc: this.editForm.get(['marketOutlookOtherDesc'])!.value,
      marketTrend: this.editForm.get(['marketTrend'])!.value,
      timeFrame: this.editForm.get(['timeFrame'])!.value,
      strategy: this.editForm.get(['strategy'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
