import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/library.sqlite',
      entities: [Book],
      synchronize: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
