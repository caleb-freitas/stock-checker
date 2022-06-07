import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from '../../services/mail.service';

export type TargetPriceReachedPayload = {
  clientEmail: string;
  stockPrice: number;
};

@Controller()
export class MailController {
  constructor(private readonly mailerService: MailService) {}

  @EventPattern('checker.target-price-reached')
  async targetPriceReached(
    @Payload('value')
    payload: TargetPriceReachedPayload,
  ) {
    console.log(`[${new Date()}] before mail service`);
    await this.mailerService.send(payload);
    console.log(`[${new Date()}] after mail service`);
  }
}
