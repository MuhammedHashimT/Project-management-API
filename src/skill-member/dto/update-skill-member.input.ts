import { CreateSkillMemberInput } from './create-skill-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSkillMemberInput extends PartialType(CreateSkillMemberInput) {
  @Field(() => Int)
  id: number;
}
