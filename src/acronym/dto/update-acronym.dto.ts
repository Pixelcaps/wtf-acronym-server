import { ApiProperty } from '@nestjs/swagger';

export class UpdateAcronymDto {
  @ApiProperty()
  definition: string;
}
