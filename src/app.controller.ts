import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MESSAGE_SERVICE') private client: ClientProxy) {}

  @Get('send')
  sendMessage() {
    this.client.emit('tag', {
      name: 'CreateTagJob',
      data: { method: 'create', type: 'crud' },
    });
    console.log('Added to queue');
    return true;
  }

  @Get('health')
  health() {
    return 'alo';
  }
}
