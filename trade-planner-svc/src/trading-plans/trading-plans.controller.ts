import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException
} from '@nestjs/common';
import { TradingPlan } from './model/trading-plan.model';
import { TradingPlanDto } from './dto/trading-plan.dto';
import { Observable } from 'rxjs';
import { TradingPlansService } from './trading-plans.service';

@Controller('trading-plans')
export class TradingPlansController {
  constructor(private readonly tradingPlansService: TradingPlansService) {}

  @Get()
  findAll(): Observable<TradingPlan[]> {
    return this.tradingPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TradingPlan {
    const tradingPlan: TradingPlan = this.tradingPlansService.findOne(id);

    if (tradingPlan === undefined) {
      throw new NotFoundException();
    }

    return tradingPlan;
  }

  @Post()
  create(@Body() createTradingPlanDto: TradingPlanDto): TradingPlan {
    return this.tradingPlansService.create(createTradingPlanDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradingPlanDto: TradingPlanDto
  ): TradingPlan {
    const tradingPlan: TradingPlan = this.tradingPlansService.update(
      id,
      updateTradingPlanDto
    );

    if (tradingPlan === undefined) {
      throw new NotFoundException();
    }

    return tradingPlan;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const tradingPlan: TradingPlan = this.tradingPlansService.delete(id);

    if (tradingPlan === undefined) {
      throw new NotFoundException();
    }
  }
}
