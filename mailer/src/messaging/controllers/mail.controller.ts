import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from '../../services/mail.service';

export type TargetPriceReachedPayload = {
  clientEmail: string;
  stockPrice: number;
  stockSymbol: string;
};

@Controller()
export class MailController {
  constructor(private readonly mailerService: MailService) {}

  @EventPattern('checker.target-price-reached')
  async targetPriceReached(
    @Payload('value')
    payload: TargetPriceReachedPayload,
  ) {
    await this.mailerService.send(payload);
    console.log(
      `[Mailer] Message consumed from checker.target-price-reached topic`,
    );
  }
}
