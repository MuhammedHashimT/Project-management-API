import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateSkillProjectInput } from './dto/create-skill-project.input';
import { UpdateSkillProjectInput } from './dto/update-skill-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillProject } from './entities/skill-project.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class SkillProjectService {
  // constructor
  constructor(
    @InjectRepository(SkillProject)
    private skillProjectRepository: Repository<SkillProject>,
    private readonly skillService: SkillService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  async create(createSkillProjectInput: CreateSkillProjectInput) {
    // check the skill exists
    const skill = await this.skillService.findOne(
      createSkillProjectInput.skill,
    );
    // check the project exists
    const project = await this.projectService.findOne(
      createSkillProjectInput.project,
    );

    // create a new skillProject
    const newSkillProject = this.skillProjectRepository.create({
      skill,
      project,
    });

    // save skillProject
    await this.skillProjectRepository.save(newSkillProject);

    return newSkillProject;
  }

  async findAll() {
    const skillProjects = await this.skillProjectRepository.find({
      relations: ['skill', 'project'],
    });
    return skillProjects;
  }

  async findOne(id: number) {
    const skillProject = await this.skillProjectRepository.findOne({
      where: { id },
      relations: ['skill', 'project'],
    });
    if (!skillProject) {
      throw new HttpException('SkillProject not found', HttpStatus.NOT_FOUND);
    }

    return skillProject;
  }

  async update(id: number, updateSkillProjectInput: UpdateSkillProjectInput) {
    // check the skill exists
    const skill = await this.skillService.findOne(
      updateSkillProjectInput.skill,
    );
    // check the project exists
    const project = await this.projectService.findOne(
      updateSkillProjectInput.project,
    );

    // create a new skillProject
    const newSkillProject = this.skillProjectRepository.create({
      id,
      skill,
      project,
    });

    // save skillProject
    await this.skillProjectRepository.save(newSkillProject);

    return newSkillProject;
  }

  async remove(id: number) {
    // check if the skillProject exists
    const skillProject = this.findOne(id);

    // delete skillProject
    await this.skillProjectRepository.delete(id);

    return skillProject;
  }
}
