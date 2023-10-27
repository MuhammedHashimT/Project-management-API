import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Member } from 'src/member/entities/member.entity';
import { SkillProject } from 'src/skill-project/entities/skill-project.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Project {
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

  @Column({ type: 'datetime' }) 
  @Field({ nullable: true })
  duration: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageId: string;
  
  // OneToMany relations

  @OneToMany(() => SkillProject , (skillProject) => skillProject.project)
  @Field(() => [SkillProject], { nullable: true })
  skillProject: SkillProject[];


  //Tasks
  @OneToMany(() => Task, (task) => task.project)
  @Field(() => [Task], { nullable: true })
  tasks: Task[];

  //manager
  @ManyToOne(() => Member, (member) => member.managedProjects)
  @Field(() => Member, { nullable: true })
  manager: Member;

  //Dates

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
