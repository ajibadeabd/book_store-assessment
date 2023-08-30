// src/prisma/prisma.module.ts

import { Module } from '@nestjs/common';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { PointEntity } from 'src/point/entity/point.entity';
import { BookEntity } from '../books/entity/book.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PointEntity, OrderEntity, BookEntity, UserEntity],
  exports: [PrismaService, PointEntity, OrderEntity, BookEntity, UserEntity],
})
export class PrismaModule {}
