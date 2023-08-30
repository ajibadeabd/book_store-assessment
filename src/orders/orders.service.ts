// orders.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { BrokerService } from '../message-broker/message.service';
import { PointService } from '../point/point.service';
import { IUser } from '../user/type';
import { OrderEntity } from './entity/order.entity';

import { CreateOrderDto } from './order.type';

@Injectable()
export class OrdersService {
  constructor(
    private readonly booksService: BooksService,
    private readonly orderEntity: OrderEntity,
    private readonly pointService: PointService,
    private readonly brokerService: BrokerService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: IUser): Promise<any> {
    try {
      const book = await this.booksService.getBook({
        id: createOrderDto.bookId,
      });
      if (!book) {
        throw new HttpException('Books not found', 400);
      }

      return await this.orderEntity.createOrder({
        book: { connect: { id: createOrderDto.bookId } },
        user: { connect: { id: user.id } },
        quantity: createOrderDto.quantity,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Order Already created earlier', 400);
      }
      throw error;
    }
  }

  async getOrders(user: IUser) {
    return this.orderEntity.getOrdersByCustomerId(+user.id);
  }

  async cancelOrder(id: number, user: IUser) {
    return this.orderEntity.deleteOrder(id, +user.id);
    // Implement logic to cancel an order with the provided id
  }
  async processSelectedOrder(user: IUser) {
    const orderResponse = await this.orderEntity.getOrdersTotalAmount(+user.id);
    if (!orderResponse.book_quantity) {
      throw new HttpException("You've Got no other", 404);
    }

    const response = await this.processOrder(
      +user.id,
      Number(orderResponse.total_amount),
      orderResponse,
    );
    // use rabbit mq to send the details to user email
    this.brokerService.processOrder(response);
    return response;
  }
  private async processOrder(
    userId: number,
    totalAmount: number,
    orderResponse,
  ) {
    return await this.orderEntity.prismaTransactionInstance(async (tx) => {
      let userPoint = await tx.point.findUnique({
        where: { user_id: userId },
      });
      if (userPoint.points < totalAmount) {
        throw new HttpException('Insufficient Balance', 400);
      }
      userPoint = await tx.point.update({
        data: {
          points: {
            // decrement: 0,
            decrement: totalAmount,
          },
        },
        where: { user_id: userId },
      });
      const purchaseHistory = orderResponse.book_ids.map(
        (history: number, i: number) => {
          return {
            user_id: userId,
            book_id: history,
            price: orderResponse.book_prices[i],
            quantity: orderResponse.book_quantity[i],
          };
        },
      );
      const order = await tx.purchaseHistory.createMany({
        data: purchaseHistory,
        skipDuplicates: true,
      });
      await tx.order.deleteMany({ where: { user_id: userId } });
      return order;
    });
  }
  getPurchaseOrder({
    page,
    perPage,
    user,
  }: {
    user: IUser;
    page: number;
    perPage: number;
  }) {
    const startIndex = (page - 1) * perPage;
    return this.orderEntity.getPurchasedOrders(startIndex, perPage, +user.id);
  }
}
