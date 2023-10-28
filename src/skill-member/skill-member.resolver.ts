import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SkillMemberService } from './skill-member.service';
import { SkillMember } from './entities/skill-member.entity';
import { CreateSkillMemberInput } from './dto/create-skill-member.input';
import { UpdateSkillMemberInput } from './dto/update-skill-member.input';

@Resolver(() => SkillMember)
export class SkillMemberResolver {
  constructor(private readonly skillMemberService: SkillMemberService) {}

  @Mutation(() => SkillMember)
  createSkillMember(@Args('createSkillMemberInput') createSkillMemberInput: CreateSkillMemberInput) {
    return this.skillMemberService.create(createSkillMemberInput);
  }

  @Query(() => [SkillMember], { name: 'skillMembers' })
  findAll() {
    return this.skillMemberService.findAll();
  }

  @Query(() => SkillMember, { name: 'skillMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.skillMemberService.findOne(id);
  }

  @Mutation(() => SkillMember)
  updateSkillMember(@Args('updateSkillMemberInput') updateSkillMemberInput: UpdateSkillMemberInput) {
    return this.skillMemberService.update(updateSkillMemberInput.id, updateSkillMemberInput);
  }

  @Mutation(() => SkillMember)
  removeSkillMember(@Args('id', { type: () => Int }) id: number) {
    return this.skillMemberService.remove(id);
  }
}
