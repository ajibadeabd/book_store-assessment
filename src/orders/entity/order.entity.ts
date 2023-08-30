import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../repository/prisma.service';

@Injectable()
export class OrderEntity {
  constructor(private prisma: PrismaService) {}

  createOrder(data) {
    return this.prisma.order.create({ data });
  }

  async getPurchasedOrders(
    startIndex: number,
    perPage: number,
    userId: number,
  ) {
    return this.prisma.purchaseHistory.findMany({
      where: { user_id: userId },
      skip: +startIndex,
      take: +perPage,
      include: {
        book: true,
      },
    });
  }

  async getOrdersByCustomerId(customerId: number) {
    return this.prisma.order.findMany({
      where: { user_id: customerId },
      include: {
        book: true,
      },
    });
  }
  async getOrdersTotalAmount(userId: number) {
    const query = Prisma.sql`
    SELECT
      SUM(o.quantity * b.point) AS total_amount,
      ARRAY_AGG(b.id) AS book_ids,
      ARRAY_AGG(  b.point) AS book_prices,
      ARRAY_AGG(o.quantity) AS book_quantity
    FROM
      "Order" o
    JOIN
      "Book" b ON o.book_id = b.id
    WHERE
      o.user_id = ${userId};
  `;

    const result = await this.prisma.$queryRaw(query);

    return result[0];
  }

  async updateOrder(orderId: number, userId: number, data) {
    return this.prisma.order.update({
      where: { id: orderId, user_id: userId },
      data,
    });
  }

  async deleteOrder(orderId: number, userId: number) {
    console.log({ id: orderId, user_id: userId });

    return this.prisma.order.delete({
      where: { user_id_book_id: { user_id: userId, book_id: orderId } },
    });
  }

  prismaTransactionInstance(transaction_function) {
    return this.prisma.$transaction(transaction_function);
  }
}
