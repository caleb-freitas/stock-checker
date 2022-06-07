import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

// eslint-disable-next-line prettier/prettier
export class KafkaService extends ClientKafka implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'checker',
        brokers: ['host.docker.internal:9094'],
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.close();
  }
}
