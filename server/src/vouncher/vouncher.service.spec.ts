import { Test, TestingModule } from '@nestjs/testing';
import { VouncherService } from './vouncher.service';

describe('VouncherService', () => {
  let service: VouncherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VouncherService],
    }).compile();

    service = module.get<VouncherService>(VouncherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
