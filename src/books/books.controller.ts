import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'; // Import the necessary decorators
import { HttpResponse } from 'src/util';
import { BooksService } from './books.service';

@ApiTags('Books') // Add this decorator to specify the tag for Swagger
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
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
  @ApiOkResponse({ description: 'Books retrieved successfully' }) // Add this decorator
  async getListOfBuy(
    @Res() response,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const books = await this.booksService.findAll({ page, perPage });
    return HttpResponse.ok(response, books, 'Books retrieved successfully');
  }
}
