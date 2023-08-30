import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class BrokerController {
  constructor() {}

  @EventPattern('process_order')
  async handleTicketProcessing(@Payload() data) {
    console.log({ data });
    console.log('sending use their orders', data);
  }
  @EventPattern('log_route')
  async logCalledRoute(@Payload() data) {
    console.log({ route: data });
  }
}
