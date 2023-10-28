import { CreateSkillProjectInput } from './dto/create-skill-project.input';
import { UpdateSkillProjectInput } from './dto/update-skill-project.input';
import { SkillProject } from './entities/skill-project.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { ProjectService } from 'src/project/project.service';
export declare class SkillProjectService {
    private skillProjectRepository;
    private readonly skillService;
    private readonly projectService;
    constructor(skillProjectRepository: Repository<SkillProject>, skillService: SkillService, projectService: ProjectService);
    create(createSkillProjectInput: CreateSkillProjectInput): Promise<SkillProject>;
    findAll(): Promise<SkillProject[]>;
    findOne(id: number): Promise<SkillProject>;
    update(id: number, updateSkillProjectInput: UpdateSkillProjectInput): Promise<SkillProject>;
    remove(id: number): Promise<SkillProject>;
}
