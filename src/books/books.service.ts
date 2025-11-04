import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const entity = this.repo.create({
      id: uuidv4(),
      ...dto,
    });
    return this.repo.save(entity);
  }

  async findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    return this.repo.save(book);
  }

  async remove(id: string): Promise<void> {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Book not found');
  }
}
