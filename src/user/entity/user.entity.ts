/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class UserEntity {
  constructor(private prisma: PrismaService) {}

  createUser(data) {
    return this.prisma.user.create({ data });
  }

  async getUser(query) {
    return this.prisma.user.findUnique({
      where: query,
    });
  }
}
