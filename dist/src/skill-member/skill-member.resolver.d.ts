import { SkillMemberService } from './skill-member.service';
import { SkillMember } from './entities/skill-member.entity';
import { CreateSkillMemberInput } from './dto/create-skill-member.input';
import { UpdateSkillMemberInput } from './dto/update-skill-member.input';
export declare class SkillMemberResolver {
    private readonly skillMemberService;
    constructor(skillMemberService: SkillMemberService);
    createSkillMember(createSkillMemberInput: CreateSkillMemberInput): Promise<SkillMember>;
    findAll(): Promise<SkillMember[]>;
    findOne(id: number): Promise<SkillMember>;
    updateSkillMember(updateSkillMemberInput: UpdateSkillMemberInput): Promise<SkillMember>;
    removeSkillMember(id: number): Promise<SkillMember>;
}
