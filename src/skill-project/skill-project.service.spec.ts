import { Test, TestingModule } from '@nestjs/testing';
import { SkillProjectService } from './skill-project.service';

describe('SkillProjectService', () => {
  let service: SkillProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillProjectService],
    }).compile();

    service = module.get<SkillProjectService>(SkillProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
