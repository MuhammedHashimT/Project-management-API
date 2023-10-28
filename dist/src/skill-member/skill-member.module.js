"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillMemberModule = void 0;
const common_1 = require("@nestjs/common");
const skill_member_service_1 = require("./skill-member.service");
const skill_member_resolver_1 = require("./skill-member.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const skill_member_entity_1 = require("./entities/skill-member.entity");
const skill_module_1 = require("../skill/skill.module");
const member_module_1 = require("../member/member.module");
let SkillMemberModule = class SkillMemberModule {
};
exports.SkillMemberModule = SkillMemberModule;
exports.SkillMemberModule = SkillMemberModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([skill_member_entity_1.SkillMember]), (0, common_1.forwardRef)(() => skill_module_1.SkillModule), (0, common_1.forwardRef)(() => member_module_1.MemberModule)],
        providers: [skill_member_resolver_1.SkillMemberResolver, skill_member_service_1.SkillMemberService],
        exports: [skill_member_service_1.SkillMemberService]
    })
], SkillMemberModule);
//# sourceMappingURL=skill-member.module.js.map