import { Test, TestingModule } from '@nestjs/testing';
import { HistoryCartService } from './history_cart.service';

describe('HistoryCartService', () => {
  let service: HistoryCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryCartService],
    }).compile();

    service = module.get<HistoryCartService>(HistoryCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
