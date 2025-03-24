import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    await this.findOne(id);

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.item.delete({
      where: { id },
    });
  }
} 