import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { PointModule } from '../point/Point.module';
import { PrismaModule } from '../repository/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PointService } from 'src/point/point.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // PointModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        signOptions: {
          expiresIn: '366d',
        },
        secret: process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY',
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService, PointService],
  exports: [UserService],
})
export class UserModule {}
