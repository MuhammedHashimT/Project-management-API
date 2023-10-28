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
exports.Member = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_entity_1 = require("../../project/entities/project.entity");
const skill_member_entity_1 = require("../../skill-member/entities/skill-member.entity");
const task_entity_1 = require("../../task/entities/task.entity");
const enums_1 = require("../../utils/enums");
const typeorm_1 = require("typeorm");
(0, graphql_1.registerEnumType)(enums_1.Roles, {
    name: 'Roles',
});
let Member = class Member {
};
exports.Member = Member;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '', nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "avatarId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], Member.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Roles, default: enums_1.Roles.MEMBER }),
    (0, graphql_1.Field)(() => enums_1.Roles, { nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_member_entity_1.SkillMember, (skillMember) => skillMember.member),
    (0, graphql_1.Field)(() => [skill_member_entity_1.SkillMember], { nullable: true }),
    __metadata("design:type", Array)
], Member.prototype, "skillMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.member, { nullable: true }),
    (0, graphql_1.Field)(() => [task_entity_1.Task], { nullable: true }),
    __metadata("design:type", Array)
], Member.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.manager, { nullable: true }),
    (0, graphql_1.Field)(() => [project_entity_1.Project], { nullable: true }),
    __metadata("design:type", Array)
], Member.prototype, "managedProjects", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Member.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Member.prototype, "updatedAt", void 0);
exports.Member = Member = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Member);
//# sourceMappingURL=member.entity.js.map