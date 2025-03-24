export enum OrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED'
}

export class UpdateOrderDto {
  status?: OrderStatus;
} 