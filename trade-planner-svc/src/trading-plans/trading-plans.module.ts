import { Module, Provider } from '@nestjs/common';
import { TradingPlansController } from './trading-plans.controller';
import { TradingPlansService } from './trading-plans.service';
import { TradingPlansInMemoryRepository } from './trading-plans.inmem.repo';
import { TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER } from './trading-plans.repo';

const tradingPlansRepoProvider: Provider = {
  provide: TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER,
  useClass: TradingPlansInMemoryRepository
};

@Module({
  controllers: [TradingPlansController],
  providers: [TradingPlansService, tradingPlansRepoProvider]
})
export class TradingPlansModule {}
