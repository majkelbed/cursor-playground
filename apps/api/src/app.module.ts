import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ItemsModule,
    OrdersModule,
  ],
})
export class AppModule {}
