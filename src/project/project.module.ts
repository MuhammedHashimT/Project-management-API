import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { MemberModule } from 'src/member/member.module';
import { SkillProjectModule } from 'src/skill-project/skill-project.module';

@Module({
  imports:[TypeOrmModule.forFeature([Project]) , MemberModule ,  forwardRef(()=>SkillProjectModule) ],
  providers: [ProjectResolver, ProjectService],
  exports:[ProjectService]
})
export class ProjectModule {}
