import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
@Injectable()
export class BrokerService {
  constructor(
    @Inject('BROKER_SERVICES_CLIENT')
    private RmqService: ClientRMQ,
  ) {}

  async processOrder(data) {
    console.log('fire');
    this.RmqService.emit('process_order', JSON.stringify(data));
  }
  async logApi(data) {
    this.RmqService.emit('log_route', JSON.stringify(data));
  }
}
