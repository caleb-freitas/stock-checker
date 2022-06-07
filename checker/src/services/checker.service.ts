import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';
import { CreateCheckOrderDto } from '../database/dto/create.check.order.dto';
import { KafkaService } from '../messaging/kafka.service';

@Injectable()
export class CheckerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  async create(createCheckOrderDto: CreateCheckOrderDto) {
    return await this.prisma.checkOrder.create({
      data: {
        ...createCheckOrderDto,
      },
    });
  }

  @Interval(20000)
  async check() {
    const checkOrder = await this.prisma.checkOrder.findUnique({
      where: {
        id: '9968eb40-cfaa-4184-81a3-e3f16efef580',
      },
    });

    const { stock, email } = checkOrder;

    const config = {
      headers: {
        'X-Finnhub-Token': 'caf5qc2ad3ibf4h8sb9g',
      },
    };
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stock}`,
      config,
    );
    if (response.data.c <= 147) {
      this.kafka.emit('checker.target-price-reached', {
        clientEmail: email,
        stockPrice: response.data.c,
      });
      console.log('send message to mailer service');
    }
  }
}
