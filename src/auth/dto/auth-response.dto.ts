import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponse {
  @ApiProperty()
  jwt: string;
}
