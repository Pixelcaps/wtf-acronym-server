import { ApiProperty } from '@nestjs/swagger';

export default class AuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
