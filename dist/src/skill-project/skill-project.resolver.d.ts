import { SkillProjectService } from './skill-project.service';
import { SkillProject } from './entities/skill-project.entity';
import { CreateSkillProjectInput } from './dto/create-skill-project.input';
import { UpdateSkillProjectInput } from './dto/update-skill-project.input';
export declare class SkillProjectResolver {
    private readonly skillProjectService;
    constructor(skillProjectService: SkillProjectService);
    createSkillProject(createSkillProjectInput: CreateSkillProjectInput): Promise<SkillProject>;
    findAll(): Promise<SkillProject[]>;
    findOne(id: number): Promise<SkillProject>;
    updateSkillProject(updateSkillProjectInput: UpdateSkillProjectInput): Promise<SkillProject>;
    removeSkillProject(id: number): Promise<SkillProject>;
}
