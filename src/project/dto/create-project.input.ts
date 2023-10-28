import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsNotEmpty() 
  @IsDate()
  duration: Date;

  //Skill
  // skillsIds
  @Field(() => [Int], { nullable: true })
  skillsIds: number[];

  //manager
  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  @IsInt()
  managerId: number;
}
