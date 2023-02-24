import { Test, TestingModule } from '@nestjs/testing';
import { AcronymController } from './acronym.controller';
import { AcronymService } from './acronym.service';

describe('AcronymController', () => {
  let controller: AcronymController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcronymController],
      providers: [AcronymService],
    }).compile();

    controller = module.get<AcronymController>(AcronymController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
