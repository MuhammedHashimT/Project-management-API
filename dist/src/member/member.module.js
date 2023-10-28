"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModule = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const member_resolver_1 = require("./member.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("./entities/member.entity");
const skill_module_1 = require("../skill/skill.module");
const skill_member_module_1 = require("../skill-member/skill-member.module");
const login_resolver_1 = require("./login/login.resolver");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const login_service_1 = require("./login/login.service");
const roles_guard_1 = require("./roles/roles.guard");
const member_provider_1 = require("./member.provider");
const member_controller_1 = require("./member.controller");
let MemberModule = class MemberModule {
};
exports.MemberModule = MemberModule;
exports.MemberModule = MemberModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member]),
            (0, common_1.forwardRef)(() => skill_module_1.SkillModule),
            (0, common_1.forwardRef)(() => skill_member_module_1.SkillMemberModule),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                useFactory: async () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '30d' },
                }),
            }),
        ],
        providers: [
            member_resolver_1.MemberResolver,
            member_service_1.MemberService,
            login_service_1.LoginService,
            login_resolver_1.LoginResolver,
            roles_guard_1.RolesGuard,
            member_provider_1.CloudinaryProvider,
        ],
        controllers: [member_controller_1.MemberController],
        exports: [member_service_1.MemberService, login_service_1.LoginService, member_provider_1.CloudinaryProvider],
    })
], MemberModule);
//# sourceMappingURL=member.module.js.map