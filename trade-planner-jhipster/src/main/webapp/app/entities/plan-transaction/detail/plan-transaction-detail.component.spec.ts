import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanTransactionDetailComponent } from './plan-transaction-detail.component';

describe('PlanTransaction Management Detail Component', () => {
  let comp: PlanTransactionDetailComponent;
  let fixture: ComponentFixture<PlanTransactionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanTransactionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ planTransaction: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlanTransactionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlanTransactionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load planTransaction on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.planTransaction).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
