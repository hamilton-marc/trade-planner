import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradingPlansModule } from './trading-plans/trading-plans.module';

@Module({
  imports: [TradingPlansModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
