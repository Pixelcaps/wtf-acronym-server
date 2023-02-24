import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AcronymService } from './acronym.service';
import { CreateAcronymDto } from './dto/create-acronym.dto';
import { UpdateAcronymDto } from './dto/update-acronym.dto';
import { Response } from 'express';

@ApiBearerAuth()
@Controller('acronym')
export class AcronymController {
  constructor(private readonly acronymService: AcronymService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAcronymDto: CreateAcronymDto) {
    return this.acronymService.create(createAcronymDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'from' })
  @ApiQuery({ name: 'limit' })
  @ApiQuery({ name: 'search' })
  @Get()
  async findMultiple(
    @Query('from') from: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Res() res: Response,
  ) {
    const results = await this.acronymService.findMultiple(
      +from,
      +limit,
      search,
    );

    res.set('more-results', results[0] > results[1].length ? 'true' : 'false');
    res.send(results[1]);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':acronym')
  findOne(@Param('acronym') acronym: string) {
    return this.acronymService.findOne(acronym);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':acronym')
  update(
    @Param('acronym') acronym: string,
    @Body() updateAcronymDto: UpdateAcronymDto,
  ) {
    return this.acronymService.update(acronym, updateAcronymDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':acronym')
  remove(@Param('acronym') acronym: string) {
    return this.acronymService.remove(acronym);
  }
}
