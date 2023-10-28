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
exports.SkillResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const skill_service_1 = require("./skill.service");
const skill_entity_1 = require("./entities/skill.entity");
const create_skill_input_1 = require("./dto/create-skill.input");
const update_skill_input_1 = require("./dto/update-skill.input");
const enums_1 = require("../utils/enums");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../member/roles/roles.guard");
let SkillResolver = class SkillResolver {
    constructor(skillService) {
        this.skillService = skillService;
    }
    createSkill(createSkillInput) {
        return this.skillService.create(createSkillInput);
    }
    findAll() {
        return this.skillService.findAll();
    }
    findOne(id) {
        return this.skillService.findOne(id);
    }
    updateSkill(updateSkillInput) {
        return this.skillService.update(updateSkillInput.id, updateSkillInput);
    }
    removeSkill(id) {
        return this.skillService.remove(id);
    }
};
exports.SkillResolver = SkillResolver;
__decorate([
    (0, graphql_1.Mutation)(() => skill_entity_1.Skill),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('createSkillInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_input_1.CreateSkillInput]),
    __metadata("design:returntype", void 0)
], SkillResolver.prototype, "createSkill", null);
__decorate([
    (0, graphql_1.Query)(() => [skill_entity_1.Skill], { name: 'skills' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => skill_entity_1.Skill, { name: 'skill' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_entity_1.Skill),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('updateSkillInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_skill_input_1.UpdateSkillInput]),
    __metadata("design:returntype", void 0)
], SkillResolver.prototype, "updateSkill", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_entity_1.Skill),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillResolver.prototype, "removeSkill", null);
exports.SkillResolver = SkillResolver = __decorate([
    (0, graphql_1.Resolver)(() => skill_entity_1.Skill),
    __metadata("design:paramtypes", [skill_service_1.SkillService])
], SkillResolver);
//# sourceMappingURL=skill.resolver.js.map