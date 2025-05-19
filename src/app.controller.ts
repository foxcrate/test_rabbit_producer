import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MESSAGE_SERVICE') private client: ClientProxy) {}

  @Get('send')
  sendMessage() {
    this.client.emit('tag', {
      name: 'UpdateContactJob',
      data: {
        id: '507f1f77bcf86cd799439011',
        workspace_id: '67d9650807b7dadc33aae00f',
        name: 'new updated',
        color: 'red',
        contacts: [20, 21],
      },
    });
    console.log('Added to queue');
    return true;
  }

  @Get('health')
  health() {
    return 'alo';
  }
}
