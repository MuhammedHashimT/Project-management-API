import { InputType, Int, Field } from '@nestjs/graphql';
import { Roles } from 'src/utils/enums';

@InputType()
export class AssignToTaskInput {
  @Field()
  username: string;

  //task
  @Field()
  task: string;
}
