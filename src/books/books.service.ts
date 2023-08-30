// books.service.ts
import { Injectable } from '@nestjs/common';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly bookEntity: BookEntity) {}

  async findAll({ page, perPage }: { page: number; perPage: number }) {
    const startIndex = (page - 1) * perPage;
    return this.bookEntity.getBooks(startIndex, perPage);
  }

  async seedBooks() {
    const bookCount = await this.bookEntity.bookCount();
    if (bookCount < 1) {
      await this.bookEntity.createMany({
        data: this.books(),
        skipDuplicates: true,
      });
      console.log('book seeded');
    }
  }
  async getBook(query) {
    return this.bookEntity.getBook(query);
  }
  books() {
    return [
      {
        title: 'Pride and Prejudice',
        writer: 'Jane Austen',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 10,
        tags: ['fiction', 'adventure'],
        created_at: '2023-08-01T12:00:00Z',
      },
      {
        title: '1984',
        writer: 'George Orwell',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 15,
        tags: ['non-fiction', 'history'],
        created_at: '2023-08-02T12:00:00Z',
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        writer: 'J.K. Rowling',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 20,
        tags: ['fiction', 'mystery'],
        created_at: '2023-08-03T12:00:00Z',
      },
      {
        title: 'The Murder of Roger Ackroyd',
        writer: 'Agatha Christie',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 25,
        tags: ['science', 'educational'],
        created_at: '2023-08-04T12:00:00Z',
      },
      {
        title: 'The Adventures of Tom Sawyer',
        writer: 'Mark Twain',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 30,
        tags: ['non-fiction', 'self-help'],
        created_at: '2023-08-05T12:00:00Z',
      },
      {
        title: 'Love in the Time of Cholera',
        writer: 'Gabriel García Márquez',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 18,
        tags: ['fiction', 'romance'],
        created_at: '2023-08-06T12:00:00Z',
      },
      {
        title: 'The Lord of the Rings',
        writer: 'J.R.R. Tolkien',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 22,
        tags: ['fiction', 'fantasy'],
        created_at: '2023-08-07T12:00:00Z',
      },
      {
        title: 'War and Peace',
        writer: 'Leo Tolstoy',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 12,
        tags: ['non-fiction', 'psychology'],
        created_at: '2023-08-08T12:00:00Z',
      },
      {
        title: 'To Kill a Mockingbird',
        writer: 'Harper Lee',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 16,
        tags: ['fiction', 'thriller'],
        created_at: '2023-08-09T12:00:00Z',
      },
      {
        title: 'Great Expectations',
        writer: 'Charles Dickens',
        coverImage:
          'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        point: 16,
        tags: ['fiction', 'thriller'],
        created_at: '2023-08-09T12:00:00Z',
      },
    ];
  }
}
