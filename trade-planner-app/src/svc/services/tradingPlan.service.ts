import { TradingPlan } from 'models';
import { TradingPlanRepository } from '../repos';

/**
 * This class represents a business service for managing reading logs.
 *
 * @author Union Hills Software
 * @date   May 26, 2019
 *
 */

export class TradingPlanService {
    constructor(
        private readonly tradingPlanRepo: TradingPlanRepository = new TradingPlanRepository()
    ) {}

    public getTradingPlans(): TradingPlan[] {
        return this.tradingPlanRepo.findAll();
    }

    public getTradingPlan(id: number): TradingPlan {
        return this.tradingPlanRepo.findOne(id);
    }
}
