import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BrokerService } from 'src/message-broker/message.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly brokerService: BrokerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const logMessage = `${request.method} ${request.url}`;
    this.brokerService.logApi(logMessage);
    return next.handle().pipe(tap(() => {}));
  }
}
