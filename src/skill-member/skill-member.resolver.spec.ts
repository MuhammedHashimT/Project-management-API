import { Test, TestingModule } from '@nestjs/testing';
import { SkillMemberResolver } from './skill-member.resolver';
import { SkillMemberService } from './skill-member.service';

describe('SkillMemberResolver', () => {
  let resolver: SkillMemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillMemberResolver, SkillMemberService],
    }).compile();

    resolver = module.get<SkillMemberResolver>(SkillMemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
