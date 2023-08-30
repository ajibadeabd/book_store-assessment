import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { BooksService } from 'src/books/books.service';
import { BrokerModule } from 'src/message-broker/message.module';
import { PointService } from 'src/point/point.service';
import { PrismaModule } from 'src/repository/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [PrismaModule, BrokerModule],
  controllers: [OrdersController],
  providers: [OrdersService, BooksService, PointService, JwtStrategy],
})
export class OrdersModule {}
