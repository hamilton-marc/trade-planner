import dayjs from 'dayjs/esm';
import { ITradingPlan } from 'app/entities/trading-plan/trading-plan.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IPlanTransaction {
  id?: number;
  numberOfContracts?: number | null;
  costPerContract?: number | null;
  stopLoss?: number | null;
  technicalStopLoss?: number | null;
  timeStop?: dayjs.Dayjs | null;
  plannedEntryDate?: dayjs.Dayjs | null;
  plannedExitDate?: dayjs.Dayjs | null;
  entryReason?: string | null;
  exitReason?: string | null;
  orderStatus?: OrderStatus | null;
  tradingPlan?: ITradingPlan | null;
}

export class PlanTransaction implements IPlanTransaction {
  constructor(
    public id?: number,
    public numberOfContracts?: number | null,
    public costPerContract?: number | null,
    public stopLoss?: number | null,
    public technicalStopLoss?: number | null,
    public timeStop?: dayjs.Dayjs | null,
    public plannedEntryDate?: dayjs.Dayjs | null,
    public plannedExitDate?: dayjs.Dayjs | null,
    public entryReason?: string | null,
    public exitReason?: string | null,
    public orderStatus?: OrderStatus | null,
    public tradingPlan?: ITradingPlan | null
  ) {}
}

export function getPlanTransactionIdentifier(planTransaction: IPlanTransaction): number | undefined {
  return planTransaction.id;
}
