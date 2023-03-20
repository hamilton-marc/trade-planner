import { IUser } from 'app/entities/user/user.model';
import { TrendOutlook } from 'app/entities/enumerations/trend-outlook.model';

export interface ITradingPlan {
  id?: number;
  name?: string;
  underlying?: string;
  underlyingDescription?: string | null;
  underlyingOutlook?: TrendOutlook | null;
  underlyingOutlookOtherDesc?: string | null;
  underlyingTrend?: string | null;
  marketOutlook?: TrendOutlook | null;
  marketOutlookOtherDesc?: string | null;
  marketTrend?: string | null;
  timeFrame?: string | null;
  strategy?: string | null;
  notes?: string | null;
  user?: IUser | null;
}

export class TradingPlan implements ITradingPlan {
  constructor(
    public id?: number,
    public name?: string,
    public underlying?: string,
    public underlyingDescription?: string | null,
    public underlyingOutlook?: TrendOutlook | null,
    public underlyingOutlookOtherDesc?: string | null,
    public underlyingTrend?: string | null,
    public marketOutlook?: TrendOutlook | null,
    public marketOutlookOtherDesc?: string | null,
    public marketTrend?: string | null,
    public timeFrame?: string | null,
    public strategy?: string | null,
    public notes?: string | null,
    public user?: IUser | null
  ) {}
}

export function getTradingPlanIdentifier(tradingPlan: ITradingPlan): number | undefined {
  return tradingPlan.id;
}
