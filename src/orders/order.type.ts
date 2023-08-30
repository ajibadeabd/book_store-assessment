// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  @IsPositive()
  bookId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  quantity: number;
}
