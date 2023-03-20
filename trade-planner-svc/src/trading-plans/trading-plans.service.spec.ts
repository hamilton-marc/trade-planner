import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TradingPlansService } from './trading-plans.service';
import { TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER } from './trading-plans.repo';
import { TradingPlansInMemoryRepository } from './trading-plans.inmem.repo';
import { TradingPlan } from './model/trading-plan.model';
import { TradingPlanDto } from './dto/trading-plan.dto';
import { TrendOutlook, OrderStatus } from './trading-plan.enum';

function generateRandomDate(min: Date, max: Date): Date {
  return new Date(
    min.getTime() + Math.random() * (max.getTime() - min.getTime())
  );
}

function generateRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAlphaString(len: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, len);
}

function generateRandomTradingPlanDto(): TradingPlanDto {
  const underlying = generateRandomAlphaString(4).toUpperCase();
  const price = generateRandomIntInclusive(30, 100);

  const tradingPlanDto: TradingPlanDto = JSON.parse(
    `{
    "underlying": "${underlying}",
    "underlyingDescription": "${underlying} Corporation",
    "marketOutlook" : "S&P is trending higher",
    "marketTrend": "up",
    "underlyingOutlook": "${underlying} is exhibiting higher highs and higher lows",
    "underlyingTrend": "up",
    "timeFrame": "weekly",
    "strategy": "stock purchase",

    "costPerContract": ${price},
    "numberOfContracts": ${generateRandomIntInclusive(1, 5) * 100},

    "stopLoss": ${Math.floor(price - 0.1 * price)},
    "technicalStopLoss": ${Math.ceil(price - 0.1 * price)},
    "timeStop": "${generateRandomDate(
      new Date(2020, 0, 1),
      new Date(2020, 12, 31)
    ).toISOString()}",

    "plannedTradeEntryDate": "${generateRandomDate(
      new Date(2019, 6, 1),
      new Date(2019, 6, 31)
    ).toISOString()}",

    "entryReason": "${underlying} seems to be bouncing off of the bottom of it's upward trend channel",
    "contingencies": "If the market experiences a sudden downturn, we may need to abort",

    "status": "planned",
    "notes": "",

    "createdAt": "${new Date().toISOString()}",
    "updatedAt": "${new Date().toISOString()}"
  }`
  );

  return tradingPlanDto;
}

function createTradingPlans(
  service: TradingPlansService,
  count: number
): TradingPlan[] {
  let tradingPlanDto: TradingPlanDto;
  const tradingPlans: TradingPlan[] = new Array<TradingPlan>(count);

  for (let i: number = 0; i < count; i++) {
    const tradingPlanDto: TradingPlanDto = generateRandomTradingPlanDto();

    tradingPlans[i] = service.create(tradingPlanDto);

    console.log(tradingPlans[i]);
  }

  return tradingPlans;
}

describe('TradingPlansService', () => {
  let service: TradingPlansService;

  beforeEach(async () => {
    const tradingPlansRepoProvider: Provider = {
      provide: TRADING_PLANS_REPOSITORY_INTERFACE_PROVIDER,
      useClass: TradingPlansInMemoryRepository
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TradingPlansService, tradingPlansRepoProvider]
    }).compile();

    service = module.get<TradingPlansService>(TradingPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('create a trading plan', () => {
    const tradingPlans: TradingPlan[] = createTradingPlans(service, 1);

    expect(tradingPlans[0].id.length).toBeGreaterThan(0);
  });

  test('get all trading plans', () => {
    const tradingPlans: TradingPlan[] = createTradingPlans(service, 3);

    service.findAll().subscribe((tradingPlans: TradingPlan[]) => {
      expect(tradingPlans.length).toBe(3);
    });
  });

  test('get one trading plan', () => {
    const createdTradingPlans: TradingPlan[] = createTradingPlans(service, 3);
    const tradingPlan: TradingPlan = service.findOne(createdTradingPlans[0].id);

    expect(createdTradingPlans[0].id).toEqual(tradingPlan.id);
  });

  test('update trading plan', () => {
    const baseTradingPlans: TradingPlan[] = createTradingPlans(service, 3);
    const newTradingPlanDto: TradingPlanDto = generateRandomTradingPlanDto();
    const updateId: string = baseTradingPlans[0].id;

    service.update(updateId, newTradingPlanDto);
    const tradingPlan: TradingPlan = service.findOne(updateId);

    expect(tradingPlan.underlying).toEqual(newTradingPlanDto.underlying);
  });

  test('delete one trading plan', () => {
    const baseTradingPlans: TradingPlan[] = createTradingPlans(service, 3);
    const deleteId: string = baseTradingPlans[0].id;
    service.delete(deleteId);

    const tradingPlan: TradingPlan = service.findOne(deleteId);

    expect(tradingPlan).toBeUndefined();
  });
});
