import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSkillMemberInput {
  @Field(() => Int, { nullable: true })
  skill: number;

  // Member
  @Field(() => Int, { nullable: true })
  member: number;
}
