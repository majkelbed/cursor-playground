import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto implements Partial<CreateItemDto> {
  title?: string;
  description?: string;
  price?: number;
  img?: string;
} 