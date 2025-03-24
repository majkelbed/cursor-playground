import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
} 