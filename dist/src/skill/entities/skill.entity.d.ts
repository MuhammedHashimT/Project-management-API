import { SkillMember } from 'src/skill-member/entities/skill-member.entity';
export declare class Skill {
    id: number;
    title: string;
    description: string;
    skillMembers: SkillMember[];
    skillProject: SkillMember[];
    createdAt: Date;
    updatedAt: Date;
}
