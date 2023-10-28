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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("typeorm");
const member_service_1 = require("../member/member.service");
const skill_project_service_1 = require("../skill-project/skill-project.service");
const enums_1 = require("../utils/enums");
const util_1 = require("../utils/util");
let ProjectService = class ProjectService {
    constructor(projectRepository, memberService, skillProjectService) {
        this.projectRepository = projectRepository;
        this.memberService = memberService;
        this.skillProjectService = skillProjectService;
    }
    async create(createProjectInput) {
        const project = await this.projectRepository.findOne({
            where: { title: createProjectInput.title },
        });
        if (project) {
            throw new common_1.HttpException('Project already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const manager = await this.memberService.findOne(createProjectInput.managerId);
        if (!manager || manager.role !== enums_1.Roles.MANAGER) {
            throw new common_1.HttpException('Manager not found', common_1.HttpStatus.NOT_FOUND);
        }
        const managerSkills = manager.skillMembers.map((skillMember) => {
            if (createProjectInput.skillsIds.includes(skillMember.skill.id)) {
                return skillMember.skill.id;
            }
        });
        if (managerSkills.length === 0) {
            throw new common_1.HttpException('Manager does not have any of the skills in the project', common_1.HttpStatus.BAD_REQUEST);
        }
        const newProject = this.projectRepository.create(createProjectInput);
        newProject.manager = manager;
        const savedProject = await this.projectRepository.save(newProject);
        createProjectInput.skillsIds.forEach(async (skillId) => {
            const SP = await this.skillProjectService.create({
                project: savedProject.id,
                skill: skillId,
            });
            return SP;
        });
        manager.isAvailable = false;
        await this.memberService.update(manager.id, manager);
        return savedProject;
    }
    async uploadImage(id, file) {
        const member = await this.findOne(id);
        if (!member) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        const { secure_url: imageUrl } = await (0, util_1.uploadFile)(file);
        const updatedMember = this.projectRepository.create({
            ...member,
            imageId: imageUrl,
        });
        const memberExists = await this.projectRepository.save(updatedMember);
        return memberExists;
    }
    async findAll() {
        const projects = await this.projectRepository.find({
            relations: ['manager', 'tasks', 'skillProject', 'skillProject.skill'],
        });
        return projects;
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: [
                'manager',
                'tasks',
                'skillProject',
                'skillProject.skill',
                'skillProject.skill.skillMembers',
            ],
        });
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        return project;
    }
    update(id, updateProjectInput) {
        const project = this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        let manager;
        if (updateProjectInput.managerId) {
            manager = this.memberService.findOne(updateProjectInput.managerId);
            if (!manager) {
                throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        const updatedProject = this.projectRepository.create(updateProjectInput);
        updatedProject.id = id;
        if (manager) {
            updatedProject.manager = manager;
        }
        this.projectRepository.save(updatedProject);
        return updatedProject;
    }
    remove(id) {
        const project = this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        this.projectRepository.delete({ id });
        return project;
    }
    async addManager(projectId, managerId) {
        const project = await this.findOne(projectId);
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        const manager = await this.memberService.findOne(managerId);
        if (!manager) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        project.manager = manager;
        await this.projectRepository.save(project);
        manager.managedProjects.push(project);
        return project;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => skill_project_service_1.SkillProjectService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        member_service_1.MemberService,
        skill_project_service_1.SkillProjectService])
], ProjectService);
//# sourceMappingURL=project.service.js.map