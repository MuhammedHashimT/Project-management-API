import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SkillProjectService } from './skill-project.service';
import { SkillProject } from './entities/skill-project.entity';
import { CreateSkillProjectInput } from './dto/create-skill-project.input';
import { UpdateSkillProjectInput } from './dto/update-skill-project.input';

@Resolver(() => SkillProject)
export class SkillProjectResolver {
  constructor(private readonly skillProjectService: SkillProjectService) {}

  @Mutation(() => SkillProject)
  createSkillProject(@Args('createSkillProjectInput') createSkillProjectInput: CreateSkillProjectInput) {
    return this.skillProjectService.create(createSkillProjectInput);
  }

  @Query(() => [SkillProject], { name: 'skillProjects' })
  findAll() {
    return this.skillProjectService.findAll();
  }

  @Query(() => SkillProject, { name: 'skillProject' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.skillProjectService.findOne(id);
  }

  @Mutation(() => SkillProject)
  updateSkillProject(@Args('updateSkillProjectInput') updateSkillProjectInput: UpdateSkillProjectInput) {
    return this.skillProjectService.update(updateSkillProjectInput.id, updateSkillProjectInput);
  }

  @Mutation(() => SkillProject)
  removeSkillProject(@Args('id', { type: () => Int }) id: number) {
    return this.skillProjectService.remove(id);
  }
}
