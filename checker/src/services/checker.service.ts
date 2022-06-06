import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCheckOrderDto } from './dto/create.check.order.dto';

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
    console.log('running cronjob');
  }
}
