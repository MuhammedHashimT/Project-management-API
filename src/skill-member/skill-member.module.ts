import { Module, forwardRef } from '@nestjs/common';
import { SkillMemberService } from './skill-member.service';
import { SkillMemberResolver } from './skill-member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillMember } from './entities/skill-member.entity';
import { SkillModule } from 'src/skill/skill.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports:[TypeOrmModule.forFeature([SkillMember]) ,forwardRef(()=>SkillModule)  , forwardRef(()=>MemberModule)],
  providers: [SkillMemberResolver, SkillMemberService],
  exports:[SkillMemberService]
})
export class SkillMemberModule {}
