import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'tagCreated',
          queueOptions: {
            durable: true,
            arguments: {
              'x-dead-letter-exchange': 'retry-exchange',
              'x-dead-letter-routing-key': 'retry-queue',
            },
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
