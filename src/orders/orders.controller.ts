// orders.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './order.type';
import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { Order } from './order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Order created successfully' })
  createOrder(
    @Req() request,
    @Body()
    createOrderDto: CreateOrderDto,
  ): Promise<any> {
    return this.ordersService.createOrder(createOrderDto, request.user);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of orders retrieved successfully',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getOrders(@Req() request): Promise<any> {
    return this.ordersService.getOrders(request.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Order cancelled successfully' })
  cancelOrder(@Req() request, @Param('id') id: number): Promise<any> {
    return this.ordersService.cancelOrder(+id, request.user);
  }
  @Post('process')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Order purchased  successfully' })
  processOrder(@Req() request): Promise<any> {
    return this.ordersService.processSelectedOrder(request.user);
  }

  @Get('paid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    required: true,
    description: 'Items per page',
  })
  @ApiOkResponse({ description: 'paid Order fetch successfully' })
  purchaseOrder(
    @Req() request,

    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): Promise<any> {
    return this.ordersService.getPurchaseOrder({
      user: request.user,
      page,
      perPage,
    });
  }
}
