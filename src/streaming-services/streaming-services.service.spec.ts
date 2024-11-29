import { Test, TestingModule } from '@nestjs/testing';
import { StreamingServicesService } from './streaming-services.service';

describe('StreamingServicesService', () => {
  let service: StreamingServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamingServicesService],
    }).compile();

    service = module.get<StreamingServicesService>(StreamingServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
