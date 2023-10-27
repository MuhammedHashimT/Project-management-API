import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { MemberService } from 'src/member/member.service';
import { ProjectService } from 'src/project/project.service';
import { Roles } from 'src/utils/enums';

@Injectable()
export class TaskService {
  // constructor
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => MemberService))
    private readonly memberService: MemberService,
  ) {}
  async create(createTaskInput: CreateTaskInput) {
    // check the project exists
    const project = await this.projectService.findOne(
      createTaskInput.projectId,
    );

    // check the member exists
    const member = await this.memberService.findOne(createTaskInput.memberId);

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    if (!member || member.role !== Roles.MEMBER) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // create a new task
    const newTask = this.taskRepository.create({
      project,
      member,
      ...createTaskInput,
    });

    // check the member have any of the skills in the project

    const memberSkills = member.skillMembers.map((skillMember) => {
      const projectSkills = project.skillProject.map((skillProject) => {
        if (skillMember.skill.id === skillProject.skill.id) {
          return skillMember.skill.id;
        }
      });
      return projectSkills;
    });

    if (memberSkills.length === 0) {
      throw new HttpException(
        'Member does not have any of the skills in the project',
        HttpStatus.BAD_REQUEST,
      );
    }

    // save task
    await this.taskRepository.save(newTask);

    return newTask;
  }

  async findAll() {
    const tasks = await this.taskRepository.find({
      relations: ['project', 'member'],
    });
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'member'],
    });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    // check the task exists
    const task = await this.findOne(id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // check the project exists if the project id is there
    let project;
    if (updateTaskInput.projectId) {
      project = this.projectService.findOne(updateTaskInput.projectId);
    }

    // check the member exists if the member id is there
    let member;
    if (updateTaskInput.memberId) {
      member = this.memberService.findOne(updateTaskInput.memberId);
    }

    // update task
    const EditedTask = this.taskRepository.create({
      ...task,
      ...updateTaskInput,
      ...(project && { project }),
      ...(member && { member }),
    });

    // save task
    await this.taskRepository.save(EditedTask);

    return task;
  }

 async remove(id: number) {
    // check the task exists
    const task =await this.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // delete task
    await this.taskRepository.delete({ id });

    return task;
  }


  // complete task

  async completeTask(id: number) {
    // check the task exists
    const task = await this.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // complete task
    const completedTask = this.taskRepository.create({
      ...task,
      isCompleted: true,
      isVerified: false,
    });

    // save task
    await this.taskRepository.save(completedTask);

    return completedTask;
  }

  // verify task

  async verifyTask(id: number) {
    // check the task exists
    const task = await this.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // verify task
    const verifiedTask = this.taskRepository.create({
      ...task,
      isVerified: true,
    });

    // save task
    await this.taskRepository.save(verifiedTask);

    return verifiedTask;
  }

}
