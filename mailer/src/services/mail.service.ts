import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TargetPriceReachedPayload } from '../messaging/controllers/mail.controller';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(payload: TargetPriceReachedPayload) {
    const { clientEmail, stockPrice } = payload;
    await this.mailerService.sendMail({
      to: clientEmail,
      subject: 'StockChecker Ltda.',
      text: `Stock reached $ ${stockPrice}`,
    });
  }
}
