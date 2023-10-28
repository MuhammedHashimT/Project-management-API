import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Member } from 'src/member/entities/member.entity';
import { Project } from 'src/project/entities/project.entity';
import { SkillMember } from 'src/skill-member/entities/skill-member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Skill {
  // Primary generated ID
  @Field(() => Int, { description: '', nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  // Normal columns

  @Column({ unique: true })
  @Field({ nullable: true })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  // OneToMany relations

  @OneToMany(() => SkillMember , (skillMember) => skillMember.skill)
  @Field(() => [SkillMember], { nullable: true })
  skillMembers: SkillMember[];

  @OneToMany(() => SkillMember , (skillMember) => skillMember.skill)
  @Field(() => [SkillMember], { nullable: true })
  skillProject: SkillMember[];

  // Dates

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}