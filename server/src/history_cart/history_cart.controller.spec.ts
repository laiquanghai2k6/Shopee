import { Test, TestingModule } from '@nestjs/testing';
import { HistoryCartController } from './history_cart.controller';

describe('HistoryCartController', () => {
  let controller: HistoryCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryCartController],
    }).compile();

    controller = module.get<HistoryCartController>(HistoryCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
