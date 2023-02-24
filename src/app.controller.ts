import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AcronymService } from './acronym/acronym.service';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly acronymService: AcronymService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('random/:count')
  getRandom(@Param('count') count: string) {
    return this.acronymService.getRandomAcronyms(+count);
  }
}
