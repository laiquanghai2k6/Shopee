import { Test, TestingModule } from '@nestjs/testing';
import { VouncherController } from './vouncher.controller';

describe('VouncherController', () => {
  let controller: VouncherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouncherController],
    }).compile();

    controller = module.get<VouncherController>(VouncherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
