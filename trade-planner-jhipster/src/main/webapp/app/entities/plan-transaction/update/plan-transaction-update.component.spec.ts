import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlanTransactionService } from '../service/plan-transaction.service';
import { IPlanTransaction, PlanTransaction } from '../plan-transaction.model';
import { ITradingPlan } from 'app/entities/trading-plan/trading-plan.model';
import { TradingPlanService } from 'app/entities/trading-plan/service/trading-plan.service';

import { PlanTransactionUpdateComponent } from './plan-transaction-update.component';

describe('PlanTransaction Management Update Component', () => {
  let comp: PlanTransactionUpdateComponent;
  let fixture: ComponentFixture<PlanTransactionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planTransactionService: PlanTransactionService;
  let tradingPlanService: TradingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlanTransactionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PlanTransactionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanTransactionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planTransactionService = TestBed.inject(PlanTransactionService);
    tradingPlanService = TestBed.inject(TradingPlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TradingPlan query and add missing value', () => {
      const planTransaction: IPlanTransaction = { id: 456 };
      const tradingPlan: ITradingPlan = { id: 74931 };
      planTransaction.tradingPlan = tradingPlan;

      const tradingPlanCollection: ITradingPlan[] = [{ id: 87046 }];
      jest.spyOn(tradingPlanService, 'query').mockReturnValue(of(new HttpResponse({ body: tradingPlanCollection })));
      const additionalTradingPlans = [tradingPlan];
      const expectedCollection: ITradingPlan[] = [...additionalTradingPlans, ...tradingPlanCollection];
      jest.spyOn(tradingPlanService, 'addTradingPlanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planTransaction });
      comp.ngOnInit();

      expect(tradingPlanService.query).toHaveBeenCalled();
      expect(tradingPlanService.addTradingPlanToCollectionIfMissing).toHaveBeenCalledWith(tradingPlanCollection, ...additionalTradingPlans);
      expect(comp.tradingPlansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const planTransaction: IPlanTransaction = { id: 456 };
      const tradingPlan: ITradingPlan = { id: 71735 };
      planTransaction.tradingPlan = tradingPlan;

      activatedRoute.data = of({ planTransaction });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(planTransaction));
      expect(comp.tradingPlansSharedCollection).toContain(tradingPlan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanTransaction>>();
      const planTransaction = { id: 123 };
      jest.spyOn(planTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planTransaction }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(planTransactionService.update).toHaveBeenCalledWith(planTransaction);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanTransaction>>();
      const planTransaction = new PlanTransaction();
      jest.spyOn(planTransactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planTransaction }));
      saveSubject.complete();

      // THEN
      expect(planTransactionService.create).toHaveBeenCalledWith(planTransaction);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanTransaction>>();
      const planTransaction = { id: 123 };
      jest.spyOn(planTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planTransactionService.update).toHaveBeenCalledWith(planTransaction);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTradingPlanById', () => {
      it('Should return tracked TradingPlan primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTradingPlanById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
