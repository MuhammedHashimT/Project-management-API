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
exports.SkillProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const skill_project_entity_1 = require("./entities/skill-project.entity");
const typeorm_2 = require("typeorm");
const skill_service_1 = require("../skill/skill.service");
const project_service_1 = require("../project/project.service");
let SkillProjectService = class SkillProjectService {
    constructor(skillProjectRepository, skillService, projectService) {
        this.skillProjectRepository = skillProjectRepository;
        this.skillService = skillService;
        this.projectService = projectService;
    }
    async create(createSkillProjectInput) {
        const skill = await this.skillService.findOne(createSkillProjectInput.skill);
        const project = await this.projectService.findOne(createSkillProjectInput.project);
        const newSkillProject = this.skillProjectRepository.create({
            skill,
            project,
        });
        await this.skillProjectRepository.save(newSkillProject);
        return newSkillProject;
    }
    async findAll() {
        const skillProjects = await this.skillProjectRepository.find({
            relations: ['skill', 'project'],
        });
        return skillProjects;
    }
    async findOne(id) {
        const skillProject = await this.skillProjectRepository.findOne({
            where: { id },
            relations: ['skill', 'project'],
        });
        if (!skillProject) {
            throw new common_1.HttpException('SkillProject not found', common_1.HttpStatus.NOT_FOUND);
        }
        return skillProject;
    }
    async update(id, updateSkillProjectInput) {
        const skill = await this.skillService.findOne(updateSkillProjectInput.skill);
        const project = await this.projectService.findOne(updateSkillProjectInput.project);
        const newSkillProject = this.skillProjectRepository.create({
            id,
            skill,
            project,
        });
        await this.skillProjectRepository.save(newSkillProject);
        return newSkillProject;
    }
    async remove(id) {
        const skillProject = this.findOne(id);
        await this.skillProjectRepository.delete(id);
        return skillProject;
    }
};
exports.SkillProjectService = SkillProjectService;
exports.SkillProjectService = SkillProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_project_entity_1.SkillProject)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => project_service_1.ProjectService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        skill_service_1.SkillService,
        project_service_1.ProjectService])
], SkillProjectService);
//# sourceMappingURL=skill-project.service.js.map