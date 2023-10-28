import { Test, TestingModule } from '@nestjs/testing';
import { SkillProjectResolver } from './skill-project.resolver';
import { SkillProjectService } from './skill-project.service';

describe('SkillProjectResolver', () => {
  let resolver: SkillProjectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillProjectResolver, SkillProjectService],
    }).compile();

    resolver = module.get<SkillProjectResolver>(SkillProjectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
