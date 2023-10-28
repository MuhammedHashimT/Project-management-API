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
exports.HasRoles = exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@nestjs/core");
const login_service_1 = require("../login/login.service");
const enums_1 = require("../../utils/enums");
const member_service_1 = require("../member.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, memberService, loginService) {
        this.reflector = reflector;
        this.memberService = memberService;
        this.loginService = loginService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const cookie = req.cookies['__user'];
        if (!cookie) {
            return false;
        }
        const token = await this.loginService.validateJwtToken(cookie);
        if (token.role === enums_1.Roles.ADMIN) {
            return true;
        }
        const userId = token.id;
        if (!userId) {
            return false;
        }
        const user = await this.memberService.findOne(userId);
        if (!user) {
            return false;
        }
        req.user = user;
        return requiredRoles.some((role) => req.user?.role === role);
    }
    async hasRoleTOJudge(context) { }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        member_service_1.MemberService,
        login_service_1.LoginService])
], RolesGuard);
const HasRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.HasRoles = HasRoles;
//# sourceMappingURL=roles.guard.js.map