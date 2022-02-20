import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlanTransactionService } from '../service/plan-transaction.service';

import { PlanTransactionComponent } from './plan-transaction.component';

describe('PlanTransaction Management Component', () => {
  let comp: PlanTransactionComponent;
  let fixture: ComponentFixture<PlanTransactionComponent>;
  let service: PlanTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlanTransactionComponent],
    })
      .overrideTemplate(PlanTransactionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanTransactionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanTransactionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.planTransactions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
