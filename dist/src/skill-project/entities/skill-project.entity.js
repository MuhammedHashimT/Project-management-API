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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillProject = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../project/entities/project.entity");
const skill_entity_1 = require("../../skill/entities/skill.entity");
const typeorm_1 = require("typeorm");
let SkillProject = class SkillProject {
};
exports.SkillProject = SkillProject;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '', nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SkillProject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skill_entity_1.Skill, (skill) => skill.skillProject),
    (0, graphql_1.Field)(() => skill_entity_1.Skill, { nullable: true }),
    __metadata("design:type", skill_entity_1.Skill)
], SkillProject.prototype, "skill", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.skillProject),
    (0, graphql_1.Field)(() => project_entity_1.Project, { nullable: true }),
    __metadata("design:type", project_entity_1.Project)
], SkillProject.prototype, "project", void 0);
exports.SkillProject = SkillProject = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], SkillProject);
//# sourceMappingURL=skill-project.entity.js.map