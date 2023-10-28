"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_resolver_1 = require("./project.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const member_module_1 = require("../member/member.module");
const skill_project_module_1 = require("../skill-project/skill-project.module");
const project_prvider_1 = require("./project.prvider");
const project_controller_1 = require("./project.controller");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]), member_module_1.MemberModule, (0, common_1.forwardRef)(() => skill_project_module_1.SkillProjectModule)],
        providers: [project_resolver_1.ProjectResolver, project_service_1.ProjectService, project_prvider_1.CloudinaryProvider],
        controllers: [project_controller_1.ProjectController],
        exports: [project_service_1.ProjectService, project_prvider_1.CloudinaryProvider]
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map