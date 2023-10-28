import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AssignToTaskInput {
  @Field()
  username: string;

  //task
  @Field()
  task: string;
}
