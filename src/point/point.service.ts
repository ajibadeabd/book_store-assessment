/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/auth/types';

import { PointEntity } from './entity/point.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PointService {
  constructor(private readonly pointEntity: PointEntity) {}
  async createPoint(point: number, userId: number) {
    return this.pointEntity.createPoint(point, userId);
  }
  async getPoint(user_id: number) {
    return this.pointEntity.getPoint({ user_id });
  }
}
