/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class PointEntity {
  constructor(private prisma: PrismaService) {}

  createPoint(points: number, userId: number) {
    return this.prisma.point.create({
      data: { points, user: { connect: { id: userId } } },
    });
  }

  async getPoint(query) {
    return this.prisma.point.findUnique({
      where: query,
    });
  }

  async updatePoint(userId, data) {
    return this.prisma.point.update({
      where: { id: userId },
      data,
    });
  }

  // async deleteUser(userId) {
  //   return this.prisma.user.delete({
  //     where: { id: userId },
  //   });
  // }
}
