import { TrendOutlook, OrderStatus } from '../trading-plan.enum';

/**
 * This class represents the concept of a Trading Plan in
 * our application.  A Trading Plan allows a trader to
 * plan out a trade.
 *
 * @author Union Hills Software
 * @date   May 26, 2019
 *
 */

export class TradingPlanDto {
  id: string;
  // For a stock, the underlying and symbol should be the same.
  // For options, the underlying would be the stock symbol
  // whilst the symbol would be the option symbol
  underlying: string;
  underlyingDescription: string;

  marketOutlook: string;
  marketTrend: TrendOutlook;

  underlyingOutlook: string;
  underlyingTrend: TrendOutlook;

  timeFrame: string;
  strategy: string;

  costPerContract: number;
  numberOfContracts: number;

  stopLoss: number;
  technicalStopLoss: number;

  timeStop: Date;

  limit: number;
  technicalLimit: number;

  plannedTradeEntryDate: Date;
  plannedTradeExitDate: Date;

  entryReason: string;
  contingencies: string;

  status: OrderStatus;
  notes: string;

  createdAt: Date;
  updatedAt: Date;
}
