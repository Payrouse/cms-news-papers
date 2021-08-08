import { Test, TestingModule } from '@nestjs/testing';
import { LastNewsGateway } from './last-news.gateway';

describe('LastNewsGateway', () => {
  let gateway: LastNewsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastNewsGateway],
    }).compile();

    gateway = module.get<LastNewsGateway>(LastNewsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
