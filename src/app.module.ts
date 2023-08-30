import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { BrokerModule } from './message-broker/message.module';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { LoggingInterceptor } from './util/logger';
// import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BooksModule, BrokerModule, UserModule, OrdersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly booksService: BooksService) {}

  async onApplicationBootstrap() {
    await this.booksService.seedBooks();
  }
}
