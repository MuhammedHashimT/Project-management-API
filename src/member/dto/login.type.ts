import { Field, ObjectType } from "@nestjs/graphql";
import { Member } from "../entities/member.entity";


@ObjectType()
export class LoginType {
  @Field(() => Member)
  admin: Member;

 @Field()
  token:string;
}