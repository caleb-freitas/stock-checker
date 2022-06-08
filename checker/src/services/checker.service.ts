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

  @Interval(60000)
  async check() {
    const checkOrders = await this.prisma.checkOrder.findMany();
    for (const checkOrder of checkOrders) {
      const { email, targetPrice, stock, id, status } = checkOrder;
      if (status === 'Checked') {
        return null;
      }
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stock}&token=caf5qc2ad3ibf4h8sb9g`,
      );
      const stockPrice = response.data.c;
      if (stockPrice <= targetPrice) {
        this.kafka.emit('checker.target-price-reached', {
          clientEmail: email,
          stockPrice: response.data.c,
          stockSymbol: stock,
        });
        console.log(
          `[Checker] Message registered on checker.target-price-reached topic`,
        );
        await this.prisma.checkOrder.update({
          where: { id },
          data: { status: 'Checked' },
        });
      }
    }
  }
}
