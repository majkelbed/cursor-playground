import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto, OrderItemDto, OrderStatus } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    // First get all item prices to calculate total
    const items = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const dbItem = await this.prisma.item.findUnique({
          where: { id: item.itemId },
          select: { price: true },
        });

        if (!dbItem) {
          throw new NotFoundException(`Item with ID ${item.itemId} not found`);
        }

        return {
          itemId: item.itemId,
          quantity: item.quantity,
          price: dbItem.price,
        };
      }),
    );

    // Calculate total price
    const total = items.reduce(
      (acc, item) => acc.add(item.price.mul(new Decimal(item.quantity))),
      new Decimal(0),
    );

    // Create order with items
    return this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        total,
        items: {
          create: items.map((item) => ({
            item: { connect: { id: item.itemId } },
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    // Delete associated order items first (this is handled by Prisma cascading deletes)
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async findUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }
} 