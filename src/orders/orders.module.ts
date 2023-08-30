import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { BooksService } from '../books/books.service';
import { BrokerModule } from '../message-broker/message.module';
import { PointService } from '../point/point.service';
import { PrismaModule } from '../repository/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [PrismaModule, BrokerModule],
  controllers: [OrdersController],
  providers: [OrdersService, BooksService, PointService, JwtStrategy],
})
export class OrdersModule {}
