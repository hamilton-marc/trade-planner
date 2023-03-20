import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TradingPlansService } from './trading-plans.service';
import { TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER } from './trading-plans.repo';
import { TradingPlansInMemoryRepository } from './trading-plans.inmem.repo';
import { TradingPlansController } from './trading-plans.controller';

describe('TradingPlans Controller', () => {
  let controller: TradingPlansController;

  beforeEach(async () => {
    const tradingPlansRepoProvider: Provider = {
      provide: TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER,
      useClass: TradingPlansInMemoryRepository
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradingPlansController],
      providers: [TradingPlansService, tradingPlansRepoProvider]
    }).compile();

    controller = module.get<TradingPlansController>(TradingPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
