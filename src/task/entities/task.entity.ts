import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Member } from 'src/member/entities/member.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Task {
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

  // IsCompleted
  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isCompleted: boolean;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isVerified: boolean;
 
  @Column({ type: 'datetime' }) 
  @Field({ nullable: true })
  duration: Date;

  // Member
  @ManyToOne(() => Member, (member) => member.tasks)
  @Field(() => Member, { nullable: true })
  member: Member;

  // Project
  @ManyToOne(() => Project, (project) => project.tasks)
  @Field(() => Project, { nullable: true })
  project: Project;
 
  // Dates

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
