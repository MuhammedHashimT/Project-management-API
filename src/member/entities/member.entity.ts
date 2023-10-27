import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { SkillMember } from 'src/skill-member/entities/skill-member.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Task } from 'src/task/entities/task.entity';
import { Roles } from '../../utils/enums';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


registerEnumType(Roles, {
  name: 'Roles',
});

@ObjectType()
@Entity()
export class Member {
  // Primary generated ID
  @Field(() => Int, { description: '', nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  // Normal columns

  @Column({ unique: true })
  @Field({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatarId: string;

  // isAvailable
  @Column({ default: true })
  @Field(() => Boolean, { defaultValue: true })
  isAvailable: boolean;

  // role
  @Column({type: 'enum', enum: Roles, default: Roles.MEMBER})
  @Field(() => Roles, { nullable: true })
  role: Roles;

  // OneToMany relations

 

  @OneToMany(() => SkillMember , (skillMember) => skillMember.member)
  @Field(() => [SkillMember], { nullable: true })
  skillMembers: SkillMember[];
  
  // Tasks

  @OneToMany(() => Task, (task) => task.member , { nullable: true })
  @Field(() => [Task] , { nullable: true })
  tasks: Task[];

  // Managed Projects

  @OneToMany(() => Project, (project) => project.manager , { nullable: true })
  @Field(() => [Project], { nullable: true })
  managedProjects: Project[];

  // Dates

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
