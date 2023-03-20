import { TestBed } from '@angular/core/testing';

import { TradingPlansService } from './trading-plans.service';

describe('TradingPlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradingPlansService = TestBed.get(TradingPlansService);
    expect(service).toBeTruthy();
  });
});
