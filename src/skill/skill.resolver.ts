import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
// import { HasRoles, RolesGuard } from 'src/member/roles/roles.guard';
import { Roles } from '../utils/enums';
import { UseGuards } from '@nestjs/common';
import { HasRoles, RolesGuard } from 'src/member/roles/roles.guard';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Mutation(() => Skill)
  @HasRoles(Roles.ADMIN )
  @UseGuards(RolesGuard)
  createSkill(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillService.create(createSkillInput);
  }

  @Query(() => [Skill], { name: 'skills' })
  findAll() {
    return this.skillService.findAll();
  }

  @Query(() => Skill, { name: 'skill' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.skillService.findOne(id);
  }

  @Mutation(() => Skill)
  @HasRoles(Roles.ADMIN )
  @UseGuards(RolesGuard)
  updateSkill(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput) {
    return this.skillService.update(updateSkillInput.id, updateSkillInput);
  }

  @Mutation(() => Skill)
  @HasRoles(Roles.ADMIN )
  @UseGuards(RolesGuard)
  removeSkill(@Args('id', { type: () => Int }) id: number) {
    return this.skillService.remove(id);
  }
}
