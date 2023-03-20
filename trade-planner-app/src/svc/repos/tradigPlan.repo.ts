import * as _ from "lodash";
import { TradingPlan } from 'models';

/**
 * This class handles the CRUD operations to our persistence store
 * for Reading Logs.
 *
 * @author Union Hills Software
 * @date   December 16, 2018
 *
 */

export class TradingPlanRepository {

    constructor(
        private fs = require('fs'),
        private tradingPlanDb: TradingPlan[] = new Array<TradingPlan>()
    ) {
        this.loadMockDb();
    }

    /**
     * We're using a simple JSON file in place of an actual database for the
     * time being.
     *
     */
    private loadMockDb() {
        this.fs.readFile('./src/svc/repos/mockTradingPlans.db.json', (err: any, data: any) => {
            if (err) throw err;

            this.tradingPlanDb = JSON.parse(data);
        });
    }

    public findAll(): TradingPlan[] {
        return this.tradingPlanDb;
    }

    public findOne(id: number): TradingPlan {
        return _.find(this.tradingPlanDb, (log: TradingPlan) => log.id == id);
    }
}