import { Field, ObjectType } from "@nestjs/graphql";
import { Member } from "../entities/member.entity";


@ObjectType()
export class LoginType {
  @Field(() => Member)
  admin: Member;
// token
 @Field()
  token:string;
}