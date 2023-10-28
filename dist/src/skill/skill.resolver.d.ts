import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
export declare class SkillResolver {
    private readonly skillService;
    constructor(skillService: SkillService);
    createSkill(createSkillInput: CreateSkillInput): Promise<Skill>;
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill>;
    updateSkill(updateSkillInput: UpdateSkillInput): Promise<Skill>;
    removeSkill(id: number): Promise<Skill>;
}
