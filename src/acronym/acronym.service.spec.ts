import { Test, TestingModule } from '@nestjs/testing';
import { AcronymService } from './acronym.service';

describe('AcronymService', () => {
  let service: AcronymService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcronymService],
    }).compile();

    service = module.get<AcronymService>(AcronymService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
