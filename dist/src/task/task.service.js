"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
const member_service_1 = require("../member/member.service");
const project_service_1 = require("../project/project.service");
const enums_1 = require("../utils/enums");
let TaskService = class TaskService {
    constructor(taskRepository, projectService, memberService) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
        this.memberService = memberService;
    }
    async create(createTaskInput) {
        const project = await this.projectService.findOne(createTaskInput.projectId);
        const member = await this.memberService.findOne(createTaskInput.memberId);
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (!member || member.role !== enums_1.Roles.MEMBER) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        const newTask = this.taskRepository.create({
            project,
            member,
            ...createTaskInput,
        });
        const memberSkills = member.skillMembers.map((skillMember) => {
            const projectSkills = project.skillProject.map((skillProject) => {
                if (skillMember.skill.id === skillProject.skill.id) {
                    return skillMember.skill.id;
                }
            });
            return projectSkills;
        });
        if (memberSkills.length === 0) {
            throw new common_1.HttpException('Member does not have any of the skills in the project', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.taskRepository.save(newTask);
        member.isAvailable = false;
        await this.memberService.update(member.id, member);
        return newTask;
    }
    async findAll() {
        const tasks = await this.taskRepository.find({
            relations: ['project', 'member'],
        });
        return tasks;
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['project', 'member'],
        });
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        return task;
    }
    async update(id, updateTaskInput) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        let project;
        if (updateTaskInput.projectId) {
            project = this.projectService.findOne(updateTaskInput.projectId);
        }
        let member;
        if (updateTaskInput.memberId) {
            member = this.memberService.findOne(updateTaskInput.memberId);
        }
        const EditedTask = this.taskRepository.create({
            ...task,
            ...updateTaskInput,
            ...(project && { project }),
            ...(member && { member }),
        });
        await this.taskRepository.save(EditedTask);
        return task;
    }
    async remove(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.taskRepository.delete({ id });
        return task;
    }
    async completeTask(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        const completedTask = this.taskRepository.create({
            ...task,
            isCompleted: true,
            isVerified: false,
        });
        await this.taskRepository.save(completedTask);
        return completedTask;
    }
    async verifyTask(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        const verifiedTask = this.taskRepository.create({
            ...task,
            isVerified: true,
        });
        await this.taskRepository.save(verifiedTask);
        verifiedTask.member.isAvailable = true;
        await this.memberService.update(verifiedTask.member.id, verifiedTask.member);
        const project = await this.projectService.findOne(task.project.id);
        const tasks = project.tasks;
        const isCompleted = tasks.every((task) => task.isVerified === true);
        if (isCompleted) {
            project.manager.isAvailable = true;
        }
        else {
            project.manager.isAvailable = false;
        }
        await this.memberService.update(project.manager.id, project.manager);
        return verifiedTask;
    }
    async rejectTask(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.HttpException('Task not found', common_1.HttpStatus.NOT_FOUND);
        }
        const rejectedTask = this.taskRepository.create({
            ...task,
            isCompleted: false,
        });
        await this.taskRepository.save(rejectedTask);
        return rejectedTask;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => member_service_1.MemberService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        project_service_1.ProjectService,
        member_service_1.MemberService])
], TaskService);
//# sourceMappingURL=task.service.js.map