export class OrderItemDto {
  itemId: string;
  quantity: number;
}

export class CreateOrderDto {
  userId: string;
  items: OrderItemDto[];
} 