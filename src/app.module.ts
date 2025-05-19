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
          urls: [
            'amqp://admin:admin12345@a2e1f0308ae864f70b22c07e4e5b9c78-309845634.eu-west-3.elb.amazonaws.com:5672',
          ],
          queue: 'DEV.CONTACTS.CONTACTS.CREATED',
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
