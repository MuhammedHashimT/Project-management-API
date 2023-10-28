import { Module, forwardRef } from '@nestjs/common';
import { SkillProjectService } from './skill-project.service';
import { SkillProjectResolver } from './skill-project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillProject } from './entities/skill-project.entity';
import { SkillModule } from 'src/skill/skill.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports:[TypeOrmModule.forFeature([SkillProject]) , SkillModule , forwardRef(()=>ProjectModule)],
  providers: [SkillProjectResolver, SkillProjectService],
  exports:[SkillProjectService]
})
export class SkillProjectModule {}
