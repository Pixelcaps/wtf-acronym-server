import { ApiProperty } from '@nestjs/swagger';

export class CreateAcronymDto {
  @ApiProperty()
  acronym: string;

  @ApiProperty()
  definition: string;
}
