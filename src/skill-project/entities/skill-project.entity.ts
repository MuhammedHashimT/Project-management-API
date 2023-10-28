import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Member } from 'src/member/entities/member.entity';
import { Project } from 'src/project/entities/project.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SkillProject {
     // Primary generated ID
     @Field(() => Int, { description: '', nullable: true })
     @PrimaryGeneratedColumn()
     id: number;
  
     // Skill
    @ManyToOne(() => Skill, (skill) => skill.skillProject)
    @Field(() => Skill, { nullable: true })
    skill: Skill;
  
    // Member
    @ManyToOne(() => Project, (project) => project.skillProject)
    @Field(() => Project, { nullable: true })
    project: Project;
}
