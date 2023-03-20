import { Observable } from 'rxjs';
import { TradingPlan } from './model/trading-plan.model';

/**
 * This class handles the CRUD operations to our persistence store
 * for Reading Logs.
 *
 * @author Union Hills Software
 * @date   December 16, 2018
 *
 */

export const TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER: string =
  'TradingPlansRepository';

export interface TradingPlansRepository {
  findAll(): Observable<TradingPlan[]>;

  findOne(id: string): TradingPlan;

  create(tradingPlan: TradingPlan): TradingPlan;

  update(id: string, tradingPlan: TradingPlan): TradingPlan;

  delete(id: string): TradingPlan;
}
