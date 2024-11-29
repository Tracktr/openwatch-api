import { Test, TestingModule } from '@nestjs/testing';
import { StreamingServicesController } from './streaming-services.controller';

describe('StreamingServicesController', () => {
  let controller: StreamingServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingServicesController],
    }).compile();

    controller = module.get<StreamingServicesController>(StreamingServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
