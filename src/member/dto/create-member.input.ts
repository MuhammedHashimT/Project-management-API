import { InputType, Int, Field } from '@nestjs/graphql';
import { Roles } from 'src/utils/enums';

@InputType()
export class CreateMemberInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio: string;

  @Field(() => Roles)
  role: Roles;

  // skillsIds
  @Field(() => [Int], { nullable: true })
  skillsIds: number[];
}
