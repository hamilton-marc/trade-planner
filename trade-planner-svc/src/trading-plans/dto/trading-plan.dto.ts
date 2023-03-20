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
  // For a stock, the underlying and symbol should be the same.
  // For options, the underlying would be the stock symbol
  // whilst the symbol would be the option symbol
  readonly underlying: string;
  readonly underlyingDescription: string;

  readonly marketOutlook: string;
  readonly marketTrend: TrendOutlook;

  readonly underlyingOutlook: string;
  readonly underlyingTrend: TrendOutlook;

  readonly timeFrame: string;
  readonly strategy: string;

  readonly costPerContract: number;
  readonly numberOfContracts: number;

  readonly stopLoss: number;
  readonly technicalStopLoss: number;

  readonly timeStop: Date;

  readonly limit: number;
  readonly technicalLimit: number;

  readonly plannedTradeEntryDate: Date;
  readonly plannedTradeExitDate: Date;

  readonly entryReason: string;
  readonly contingencies: string;

  readonly status: OrderStatus;
  readonly notes: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
