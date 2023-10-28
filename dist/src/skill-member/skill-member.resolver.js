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
exports.SkillMemberResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const skill_member_service_1 = require("./skill-member.service");
const skill_member_entity_1 = require("./entities/skill-member.entity");
const create_skill_member_input_1 = require("./dto/create-skill-member.input");
const update_skill_member_input_1 = require("./dto/update-skill-member.input");
let SkillMemberResolver = class SkillMemberResolver {
    constructor(skillMemberService) {
        this.skillMemberService = skillMemberService;
    }
    createSkillMember(createSkillMemberInput) {
        return this.skillMemberService.create(createSkillMemberInput);
    }
    findAll() {
        return this.skillMemberService.findAll();
    }
    findOne(id) {
        return this.skillMemberService.findOne(id);
    }
    updateSkillMember(updateSkillMemberInput) {
        return this.skillMemberService.update(updateSkillMemberInput.id, updateSkillMemberInput);
    }
    removeSkillMember(id) {
        return this.skillMemberService.remove(id);
    }
};
exports.SkillMemberResolver = SkillMemberResolver;
__decorate([
    (0, graphql_1.Mutation)(() => skill_member_entity_1.SkillMember),
    __param(0, (0, graphql_1.Args)('createSkillMemberInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_member_input_1.CreateSkillMemberInput]),
    __metadata("design:returntype", void 0)
], SkillMemberResolver.prototype, "createSkillMember", null);
__decorate([
    (0, graphql_1.Query)(() => [skill_member_entity_1.SkillMember], { name: 'skillMembers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillMemberResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => skill_member_entity_1.SkillMember, { name: 'skillMember' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillMemberResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_member_entity_1.SkillMember),
    __param(0, (0, graphql_1.Args)('updateSkillMemberInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_skill_member_input_1.UpdateSkillMemberInput]),
    __metadata("design:returntype", void 0)
], SkillMemberResolver.prototype, "updateSkillMember", null);
__decorate([
    (0, graphql_1.Mutation)(() => skill_member_entity_1.SkillMember),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SkillMemberResolver.prototype, "removeSkillMember", null);
exports.SkillMemberResolver = SkillMemberResolver = __decorate([
    (0, graphql_1.Resolver)(() => skill_member_entity_1.SkillMember),
    __metadata("design:paramtypes", [skill_member_service_1.SkillMemberService])
], SkillMemberResolver);
//# sourceMappingURL=skill-member.resolver.js.map