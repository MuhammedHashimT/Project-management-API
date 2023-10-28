"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillProjectModule = void 0;
const common_1 = require("@nestjs/common");
const skill_project_service_1 = require("./skill-project.service");
const skill_project_resolver_1 = require("./skill-project.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const skill_project_entity_1 = require("./entities/skill-project.entity");
const skill_module_1 = require("../skill/skill.module");
const project_module_1 = require("../project/project.module");
let SkillProjectModule = class SkillProjectModule {
};
exports.SkillProjectModule = SkillProjectModule;
exports.SkillProjectModule = SkillProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([skill_project_entity_1.SkillProject]), skill_module_1.SkillModule, (0, common_1.forwardRef)(() => project_module_1.ProjectModule)],
        providers: [skill_project_resolver_1.SkillProjectResolver, skill_project_service_1.SkillProjectService],
        exports: [skill_project_service_1.SkillProjectService]
    })
], SkillProjectModule);
//# sourceMappingURL=skill-project.module.js.map