/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class BookEntity {
  constructor(private prisma: PrismaService) {}

  createUser(data) {
    return this.prisma.book.create({ data });
  }

  async getBooks(startIndex: number, perPage: number) {
    return this.prisma.book.findMany({
      skip: +startIndex,
      take: +perPage,
    });
  }
  async getBook(query) {
    return this.prisma.book.findUnique({ where: query });
  }

  async updateUser(userId, data) {
    return this.prisma.book.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId) {
    return this.prisma.book.delete({
      where: { id: userId },
    });
  }
  async createMany(bookDetails) {
    return this.prisma.book.createMany(bookDetails);
  }
  bookCount() {
    return this.prisma.book.count();
  }
}
