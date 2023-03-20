import { Router, Request, Response } from 'express';
import { TradingPlan } from 'models';
import { TradingPlanService } from '../services';

/**
 * This class wraps acts as kindof a factory for creating and configuring
 * an Express router for performing the CRUD behavior for reading logs.
 * configuration.
 *
 * @author Union Hills Software
 * @date   November 20, 2018
 *
 */

export class TradingPlanController {
    constructor(
        private readonly router: Router = Router(),
        private readonly tradingPlanSvc: TradingPlanService = new TradingPlanService()
    ) {
        this.setupRoutes();
    }

    /**
     * Sets up typical routes for getting many items or getting one item with an id.
     *
     */
    private setupRoutes() {
        this.router.get('/', (req: Request, res: Response) => this.getTradingPlans(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getTradingPlan(req, res));
    }

    /**
     * Retrieves all the trading plans.
     *
     */
    private getTradingPlans(req: Request, res: Response) {
        const tradingPlans: TradingPlan[] = this.tradingPlanSvc.getTradingPlans();

        return res.json(tradingPlans);
    }

    private getTradingPlan(req: Request, res: Response) {
        const id = req.params.id;
        const tradingPlan: TradingPlan = this.tradingPlanSvc.getTradingPlan(id);

        return res.json(TradingPlan);
    }

    public getRouter(): Router {
        return this.router;
    }
}