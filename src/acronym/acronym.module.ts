import { Module } from '@nestjs/common';
import { AcronymService } from './acronym.service';
import { AcronymController } from './acronym.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AcronymController],
  providers: [AcronymService],
  exports: [AcronymService],
})
export class AcronymModule {}
