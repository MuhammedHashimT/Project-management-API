import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { HasRoles, RolesGuard } from './roles/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../utils/enums';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  @HasRoles(Roles.ADMIN)
  @UseGuards(RolesGuard)
  createMember(@Args('createMemberInput') createMemberInput: CreateMemberInput) {
    return this.memberService.create(createMemberInput);
  }

  @Query(() => [Member], { name: 'members' })
  findAll() {
    return this.memberService.findAll();
  }

  @Query(() => Member, { name: 'member' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.memberService.findOne(id);
  }

  @Mutation(() => Member)
  @HasRoles(Roles.ADMIN)
  @UseGuards(RolesGuard)
  updateMember(@Args('updateMemberInput') updateMemberInput: UpdateMemberInput) {
    return this.memberService.update(updateMemberInput.id, updateMemberInput);
  }

  @Mutation(() => Member)
  @HasRoles(Roles.ADMIN)
  @UseGuards(RolesGuard)
  removeMember(@Args('id', { type: () => Int }) id: number) {
    return this.memberService.remove(id);
  }
}
