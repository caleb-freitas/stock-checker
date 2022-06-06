import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckerController } from './controllers/checker.controller';
import { DatabaseModule } from './database/database.module';
import { CheckerService } from './services/checker.service';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  controllers: [CheckerController],
  providers: [CheckerService],
})
export class AppModule {}
