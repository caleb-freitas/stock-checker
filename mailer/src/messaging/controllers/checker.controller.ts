import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type TargetPriceReachedPayload = {
  clientEmail: string;
  stockPrice: number;
};

@Controller()
export class CheckerController {
  @EventPattern('checker.target-price-reached')
  async targetPriceReached(
    @Payload('value')
    payload: TargetPriceReachedPayload,
  ) {
    console.log(payload);
  }
}
