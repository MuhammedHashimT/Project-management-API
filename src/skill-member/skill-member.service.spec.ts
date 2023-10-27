import { Test, TestingModule } from '@nestjs/testing';
import { SkillMemberService } from './skill-member.service';

describe('SkillMemberService', () => {
  let service: SkillMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillMemberService],
    }).compile();

    service = module.get<SkillMemberService>(SkillMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
