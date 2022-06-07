import { Body, Controller, Post } from '@nestjs/common';
import { CheckerService } from '../services/checker.service';
import { CreateCheckOrderDto } from '../database/dto/create.check.order.dto';

@Controller('check')
export class CheckerController {
  constructor(private checkerService: CheckerService) {}

  @Post()
  async create(
    @Body()
    createCheckOrderDto: CreateCheckOrderDto,
  ) {
    return this.checkerService.create(createCheckOrderDto);
  }
}
