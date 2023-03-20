import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TradingPlanDto } from './trading-plans/dto/trading-plan.dto';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  private nextId: number = 0;
  
  createDb() {
    const tradingPlans = this.createTradingPlans(10);
    const db = { 'trading-plans': tradingPlans };

    return of(db);
  }

  private generateRandomDate(min: Date, max: Date): Date {
    return new Date(
      min.getTime() + Math.random() * (max.getTime() - min.getTime())
    );
  }

  private generateRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateRandomAlphaString(len: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, len);
  }

  public generateRandomTradingPlanDto(id: string): TradingPlanDto {
    const underlying = this.generateRandomAlphaString(4).toUpperCase();
    const price = this.generateRandomIntInclusive(30, 100);
    const idKeyValuePairWithComma = id ? `"id": "${id}",` : "";

    const tradingPlanDto: TradingPlanDto = JSON.parse(
    `{
      ${idKeyValuePairWithComma}
      "underlying": "${underlying}",
      "underlyingDescription": "${underlying} Corporation",
      "marketOutlook" : "S&P is trending higher",
      "marketTrend": "up",
      "underlyingOutlook": "${underlying} is exhibiting higher highs and higher lows",
      "underlyingTrend": "up",
      "timeFrame": "weekly",
      "strategy": "stock purchase",
  
      "costPerContract": ${price},
      "numberOfContracts": ${this.generateRandomIntInclusive(1, 5) * 100},
  
      "stopLoss": ${Math.floor(price - 0.1 * price)},
      "technicalStopLoss": ${Math.ceil(price - 0.1 * price)},
      "timeStop": "${this.generateRandomDate(
        new Date(2020, 0, 1),
        new Date(2020, 12, 31)
      ).toISOString()}",
  
      "plannedTradeEntryDate": "${this.generateRandomDate(
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

  public genId(): string {
    console.log('InMemoryDataService::genId()');
    const newId = (++this.nextId).toString();
    console.log('newId = ' + newId);

    return newId;
  }

  private createTradingPlans(count: number): TradingPlanDto[] {
    let tradingPlanDto: TradingPlanDto;
    const tradingPlans: TradingPlanDto[] = new Array<TradingPlanDto>(count);

    for (let i: number = 0; i < count; i++) {
      tradingPlans[i] = this.generateRandomTradingPlanDto(this.genId());

      console.log(tradingPlans[i]);
    }

    return tradingPlans;
  }
}
