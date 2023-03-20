import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TradingPlan } from './model/trading-plan.model';
import { TradingPlanDto } from './dto/trading-plan.dto';
import {
  TradingPlansRepository,
  TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER
} from './trading-plans.repo';

@Injectable()
export class TradingPlansService {
  constructor(
    @Inject(TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER)
    private readonly tradingPlansRepo: TradingPlansRepository
  ) {}

  public findAll(): Observable<TradingPlan[]> {
    return this.tradingPlansRepo.findAll();
  }

  public findOne(id: string): TradingPlan {
    return this.tradingPlansRepo.findOne(id);
  }

  public create(tradingPlan: TradingPlanDto): TradingPlan {
    return this.tradingPlansRepo.create(tradingPlan);
  }

  public update(id: string, tradingPlan: TradingPlanDto): TradingPlan {
    return this.tradingPlansRepo.update(id, tradingPlan);
  }

  public delete(id: string): TradingPlan {
    return this.tradingPlansRepo.delete(id);
  }
}
