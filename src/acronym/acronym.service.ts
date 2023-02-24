import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAcronymDto } from './dto/create-acronym.dto';
import { UpdateAcronymDto } from './dto/update-acronym.dto';

@Injectable()
export class AcronymService {
  constructor(private prismaService: PrismaService) {}

  create({ acronym, definition }: CreateAcronymDto) {
    return this.prismaService.acronym.create({
      data: {
        acronym: acronym,
        definition: definition,
      },
    });
  }

  findMultiple(from: number, limit: number, search: string) {
    return this.prismaService.$transaction([
      this.prismaService.acronym.count({
        where: {
          OR: [
            {
              acronym: search.toUpperCase(),
            },
            {
              acronym: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
      this.prismaService.acronym.findMany({
        skip: from,
        take: limit,
        where: {
          OR: [
            {
              acronym: search.toUpperCase(),
            },
            {
              acronym: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          id: 'asc',
        },
      }),
    ]);
  }

  findOne(acronym: string) {
    return this.prismaService.acronym.findMany({
      where: { acronym: acronym.toUpperCase() },
    });
  }

  update(acronym: string, updateAcronymDto: UpdateAcronymDto) {
    return this.prismaService.acronym.updateMany({
      where: { acronym: acronym.toUpperCase() },
      data: updateAcronymDto,
    });
  }

  remove(acronym: string) {
    return this.prismaService.acronym.deleteMany({
      where: { acronym: acronym.toUpperCase() },
    });
  }

  getRandomAcronyms(count: number) {
    return this.prismaService.$queryRaw(
      Prisma.sql`SELECT * FROM "public"."Acronym" ORDER BY RANDOM() LIMIT ${count}`,
    );
  }
}
