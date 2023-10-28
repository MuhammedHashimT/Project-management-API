/// <reference types="multer" />
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { MemberService } from 'src/member/member.service';
import { SkillProjectService } from 'src/skill-project/skill-project.service';
export declare class ProjectService {
    private projectRepository;
    private readonly memberService;
    private readonly skillProjectService;
    constructor(projectRepository: Repository<Project>, memberService: MemberService, skillProjectService: SkillProjectService);
    create(createProjectInput: CreateProjectInput): Promise<Project>;
    uploadImage(id: number, file: Express.Multer.File): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    update(id: number, updateProjectInput: UpdateProjectInput): Project;
    remove(id: number): Promise<Project>;
    addManager(projectId: number, managerId: number): Promise<Project>;
}
