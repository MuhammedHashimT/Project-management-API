"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModule = void 0;
const common_1 = require("@nestjs/common");
const skill_service_1 = require("./skill.service");
const skill_resolver_1 = require("./skill.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const skill_entity_1 = require("./entities/skill.entity");
const member_module_1 = require("../member/member.module");
let SkillModule = class SkillModule {
};
exports.SkillModule = SkillModule;
exports.SkillModule = SkillModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([skill_entity_1.Skill]), member_module_1.MemberModule],
        providers: [skill_resolver_1.SkillResolver, skill_service_1.SkillService],
        exports: [skill_service_1.SkillService]
    })
], SkillModule);
//# sourceMappingURL=skill.module.js.map