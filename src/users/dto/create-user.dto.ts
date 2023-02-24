import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
