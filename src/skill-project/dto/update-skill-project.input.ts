import { CreateSkillProjectInput } from './create-skill-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSkillProjectInput extends PartialType(CreateSkillProjectInput) {
  @Field(() => Int)
  id: number;
}
