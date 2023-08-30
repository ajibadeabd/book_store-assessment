import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as fs from 'fs';
@Controller()
export class BrokerController {
  constructor() {}

  @EventPattern('process_order')
  async handleTicketProcessing(@Payload() data) {
    console.log('sending use their orders', data);
  }
  @EventPattern('log_route')
  async logCalledRoute(@Payload() data) {
    // Save the log message to the file
    fs.appendFile('api_logs.txt', data + '\n', (err) => {
      if (err) {
        console.error('Error saving log:', err);
      } else {
        console.log('Log saved to file:', 'api_logs.txt');
      }
    });
    console.log({ route: data });
  }
}
