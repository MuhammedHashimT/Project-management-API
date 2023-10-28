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
exports.Skill = void 0;
const graphql_1 = require("@nestjs/graphql");
const skill_member_entity_1 = require("../../skill-member/entities/skill-member.entity");
const typeorm_1 = require("typeorm");
let Skill = class Skill {
};
exports.Skill = Skill;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '', nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Skill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_member_entity_1.SkillMember, (skillMember) => skillMember.skill),
    (0, graphql_1.Field)(() => [skill_member_entity_1.SkillMember], { nullable: true }),
    __metadata("design:type", Array)
], Skill.prototype, "skillMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_member_entity_1.SkillMember, (skillMember) => skillMember.skill),
    (0, graphql_1.Field)(() => [skill_member_entity_1.SkillMember], { nullable: true }),
    __metadata("design:type", Array)
], Skill.prototype, "skillProject", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Skill.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Skill.prototype, "updatedAt", void 0);
exports.Skill = Skill = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Skill);
//# sourceMappingURL=skill.entity.js.map