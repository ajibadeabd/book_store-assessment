import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PointService } from './point.service';
import { PrismaModule } from '../repository/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [],
  providers: [PointService],
  exports: [PointService],
})
export class PointModule {}
