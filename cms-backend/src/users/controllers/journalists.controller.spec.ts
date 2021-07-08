import { Test, TestingModule } from '@nestjs/testing';
import { JournalistsController } from './journalists.controller';

describe('JournalistsController', () => {
  let controller: JournalistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalistsController],
    }).compile();

    controller = module.get<JournalistsController>(JournalistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
