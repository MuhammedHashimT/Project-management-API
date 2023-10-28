import { CreateSkillMemberInput } from './dto/create-skill-member.input';
import { UpdateSkillMemberInput } from './dto/update-skill-member.input';
import { SkillService } from 'src/skill/skill.service';
import { MemberService } from 'src/member/member.service';
import { SkillMember } from './entities/skill-member.entity';
import { Repository } from 'typeorm';
export declare class SkillMemberService {
    private skillMemberRepository;
    private readonly skillService;
    private readonly memberService;
    constructor(skillMemberRepository: Repository<SkillMember>, skillService: SkillService, memberService: MemberService);
    create(createSkillMemberInput: CreateSkillMemberInput): Promise<SkillMember>;
    findAll(): Promise<SkillMember[]>;
    findOne(id: number): Promise<SkillMember>;
    update(id: number, updateSkillMemberInput: UpdateSkillMemberInput): Promise<SkillMember>;
    remove(id: number): Promise<SkillMember>;
}
