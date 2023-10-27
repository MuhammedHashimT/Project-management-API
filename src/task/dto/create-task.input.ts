import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsDate()
  duration: Date;

  

  // Member
  @Field(()=> Int ,{ nullable: true })
  @IsNotEmpty()
  @IsInt()
  memberId: number;

  // Project
  @Field(()=> Int ,{ nullable: true })
  @IsNotEmpty()
  @IsInt()
  projectId: number;
}
