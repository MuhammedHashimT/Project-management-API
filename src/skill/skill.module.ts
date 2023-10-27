import { Module, forwardRef } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports:[TypeOrmModule.forFeature([Skill]) , MemberModule],
  providers: [SkillResolver, SkillService],
  exports:[SkillService]
})
export class SkillModule {}
