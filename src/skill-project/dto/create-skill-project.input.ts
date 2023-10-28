import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSkillProjectInput {
  @Field(() => Int, { nullable: true })
  skill: number;

  // Member
  @Field(() => Int, { nullable: true })
  project: number;
}
