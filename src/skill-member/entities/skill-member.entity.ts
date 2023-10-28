import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Member } from 'src/member/entities/member.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SkillMember {
   // Primary generated ID
   @Field(() => Int, { description: '', nullable: true })
   @PrimaryGeneratedColumn()
   id: number;

   // Skill
  @ManyToOne(() => Skill, (skill) => skill.skillMembers)
  @Field(() => Skill, { nullable: true })
  skill: Skill;

  // Member
  @ManyToOne(() => Member, (member) => member.skillMembers)
  @Field(() => Member, { nullable: true })
  member: Member;
}
