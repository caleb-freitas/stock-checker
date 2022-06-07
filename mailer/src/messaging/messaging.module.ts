import { Module } from '@nestjs/common';
import { CheckerController } from './controllers/checker.controller';

@Module({
  controllers: [CheckerController],
})
export class MessagingModule {}
