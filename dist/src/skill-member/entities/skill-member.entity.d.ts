import { Member } from 'src/member/entities/member.entity';
import { Skill } from 'src/skill/entities/skill.entity';
export declare class SkillMember {
    id: number;
    skill: Skill;
    member: Member;
}
