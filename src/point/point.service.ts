/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';

import { PointEntity } from './entity/point.entity';

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
