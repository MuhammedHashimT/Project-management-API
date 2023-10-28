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
exports.SkillProjectResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const skill_project_service_1 = require("./skill-project.service");
const skill_project_entity_1 = require("./entities/skill-project.entity");
const create_skill_project_input_1 = require("./dto/create-skill-project.input");
const update_skill_project_input_1 = require("./dto/update-skill-project.input");
let SkillProjectResolver = class SkillProjectResolver {
    constructor(skillProjectService) {
        this.skillProjectService = skillProjectService;
    }
    createSkillProject(createSkillProjectInput) {
        return this.skillProjectService.create(createSkillProjectInput);
    }
    findAll() {
        return this.skillProjectService.findAll();
    }
    findOne(id) {
        return this.skillProjectService.findOne(id);
    }
    updateSkillProject(updateSkillProjectInput) {
        return this.skillProjectService.update(updateSkillProjectInput.id, updateSkillProjectInput);
    }
    removeSkillProject(id) {
        return this.skillProjectService.remove(id);
    }
};
exports.SkillProjectResolver = SkillProjectResolver;
__decorate([
    (0, graphql_1.Mutation)(() => skill_project_entity_1.SkillProject),
    __param(0, (0, graphql_1.Args)('createSkillProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_project_input_1.CreateSkillProjectInput]),
    __metadata("design:returntype", void 0)
], SkillProjectResolver.prototype, "createSkillProject", null);
__decorate([
    (0, graphql_1.Query)(() => [skill_project_entity_1.SkillProject], { name: 'skillProjects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillProjectResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => skill_project_entity_1.SkillProject, { name: 'skillProject' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillProjectResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_project_entity_1.SkillProject),
    __param(0, (0, graphql_1.Args)('updateSkillProjectInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_skill_project_input_1.UpdateSkillProjectInput]),
    __metadata("design:returntype", void 0)
], SkillProjectResolver.prototype, "updateSkillProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_project_entity_1.SkillProject),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillProjectResolver.prototype, "removeSkillProject", null);
exports.SkillProjectResolver = SkillProjectResolver = __decorate([
    (0, graphql_1.Resolver)(() => skill_project_entity_1.SkillProject),
    __metadata("design:paramtypes", [skill_project_service_1.SkillProjectService])
], SkillProjectResolver);
//# sourceMappingURL=skill-project.resolver.js.map