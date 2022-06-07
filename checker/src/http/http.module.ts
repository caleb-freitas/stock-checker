import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';
import { CheckerService } from '../services/checker.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MessagingModule],
  providers: [CheckerService],
})
export class HttpModule {}
