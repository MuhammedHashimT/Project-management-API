import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { MemberService } from 'src/member/member.service';
import { SkillProjectService } from 'src/skill-project/skill-project.service';
import { Roles } from '../utils/enums';
import { uploadFile } from 'src/utils/util';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private readonly memberService: MemberService,
    @Inject(forwardRef(() => SkillProjectService))
    private readonly skillProjectService: SkillProjectService,
  ) {}

  
  async create(createProjectInput: CreateProjectInput) {

    // check project exists
    const project = await this.projectRepository.findOne({
      where: { title: createProjectInput.title },
    });

    if (project) {
      throw new HttpException('Project already exists', HttpStatus.BAD_REQUEST);
    }
    // check manager exists
    const manager = await this.memberService.findOne(
      createProjectInput.managerId,
    );

    if (!manager || manager.role !== Roles.MANAGER) {
      throw new HttpException('Manager not found', HttpStatus.NOT_FOUND);
    }

    // check the manager have any of the skills in the project
    const managerSkills = manager.skillMembers.map((skillMember) => {
      if(createProjectInput.skillsIds.includes(skillMember.skill.id)){
        return skillMember.skill.id
      }
    }
    );

    if (managerSkills.length === 0) {
      throw new HttpException(
        'Manager does not have any of the skills in the project',
        HttpStatus.BAD_REQUEST,
      );
    }

    // create a new project
    const newProject = this.projectRepository.create(createProjectInput);

    // assign manager to project
    newProject.manager = manager;

    // save project
    const savedProject = await this.projectRepository.save(newProject);

    // add skill-project for each skill
    createProjectInput.skillsIds.forEach(async (skillId) => {
      
     const SP = await this.skillProjectService.create({
        project: savedProject.id,
        skill: skillId,
      });
      
      return SP;
    });

    return savedProject;
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    // check the member exists
    const member = await this.findOne(id);

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // upload image
    const { secure_url: imageUrl } = await uploadFile(file);

    // update member
    const updatedMember = this.projectRepository.create({
      ...member,
      imageId : imageUrl,
    });

    // save member
    const memberExists = await this.projectRepository.save(updatedMember);

    return memberExists;
  }

  async findAll() {
    const projects = await this.projectRepository.find({
      relations: ['manager', 'tasks', 'skillProject', 'skillProject.skill'],
    });
    
    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['manager', 'tasks', 'skillProject', 'skillProject.skill'],
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    // check if the project exists
    const project = this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    // check if the manager exists
    let manager;
    if (updateProjectInput.managerId) {
      manager = this.memberService.findOne(updateProjectInput.managerId);
      if (!manager) {
        throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
      }
    }

    // update project by create
    const updatedProject = this.projectRepository.create(updateProjectInput);
    updatedProject.id = id;
    if (manager) {
      updatedProject.manager = manager;
    }
    this.projectRepository.save(updatedProject);

    return updatedProject;
  }

  remove(id: number) {
    const project = this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    this.projectRepository.delete({ id });
    return project;
  }

  // add manager to project
  async addManager(projectId: number, managerId: number) {
    // check if the project exists
    const project = await this.findOne(projectId);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    // check if the manager exists
    const manager = await this.memberService.findOne(managerId);
    if (!manager) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // assign manager to project
    project.manager = manager;

    // save project
    await this.projectRepository.save(project);

    // add project to manager
    manager.managedProjects.push(project);

    // save manager
    // await this.memberService.update(managerId, manager);

    return project;
  }
}
