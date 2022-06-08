import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TargetPriceReachedPayload } from '../messaging/controllers/mail.controller';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(payload: TargetPriceReachedPayload) {
    const { clientEmail, stockPrice, stockSymbol } = payload;
    await this.mailerService.sendMail({
      to: clientEmail,
      subject: `StockChecker | ${stockSymbol}`,
      text: `Hi! The ${stockSymbol} stock reached $ ${stockPrice}.`,
    });
  }
}
