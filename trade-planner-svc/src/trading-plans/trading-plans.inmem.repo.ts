import { Observable, of } from 'rxjs';
import { TradingPlan } from './model/trading-plan.model';
import { Injectable } from '@nestjs/common';
import { TradingPlansRepository } from './trading-plans.repo';

/**
 * This class handles the CRUD operations to our persistence store
 * for Reading Logs.
 *
 * @author Union Hills Software
 * @date   December 16, 2018
 *
 */

@Injectable()
export class TradingPlansInMemoryRepository implements TradingPlansRepository {
  private fs = require('fs');
  private tradingPlanDb: TradingPlan[] = new Array<TradingPlan>();
  private nextId: number = 3;

  constructor() {
    this.loadMockDb();
  }

  /**
   * We're using a simple JSON file in place of an actual database for the
   * time being.
   *
   */
  private loadMockDb() {
    this.fs.readFile(
      './src/trading-plans/trading-plans.mockdb.json',
      (err: any, data: any) => {
        if (err) throw err;

        this.tradingPlanDb = JSON.parse(data);
      }
    );
  }

  public findAll(): Observable<TradingPlan[]> {
    return of(this.tradingPlanDb);
  }

  public findOne(id: string): TradingPlan {
    return this.tradingPlanDb.find(plan => plan.id === id);
  }

  public create(tradingPlan: TradingPlan): TradingPlan {
    tradingPlan.id = (this.nextId++).toString();
    this.tradingPlanDb.push(tradingPlan);

    return tradingPlan;
  }

  public update(id: string, tradingPlan: TradingPlan): TradingPlan {
    const foundIndex: number = this.tradingPlanDb.findIndex(
      plan => plan.id === id
    );

    if (foundIndex < 0) {
      return undefined;
    }

    tradingPlan.id = id;
    this.tradingPlanDb[foundIndex] = tradingPlan;

    return tradingPlan;
  }

  public delete(id: string): TradingPlan {
    // Replace the tradingPlanDb with everything in the original except
    // the item we're deleting.
    const tradingPlan = this.findOne(id);
    this.tradingPlanDb = this.tradingPlanDb.filter(plan => plan.id !== id);

    return tradingPlan;
  }
}
