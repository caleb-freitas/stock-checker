import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';
import { CreateCheckOrderDto } from '../database/dto/create.check.order.dto';

@Injectable()
export class CheckerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCheckOrderDto: CreateCheckOrderDto) {
    return await this.prisma.checkOrder.create({
      data: {
        ...createCheckOrderDto,
      },
    });
  }

  @Interval(20000)
  async check() {
    const config = {
      headers: {
        'X-Finnhub-Token': 'caf5qc2ad3ibf4h8sb9g',
      },
    };
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=AAPL`,
      config,
    );
    if (response.data.c <= 147) {
      console.log('send message to mailer service');
    }
  }
}
