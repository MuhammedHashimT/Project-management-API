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
exports.LoginResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const login_service_1 = require("./login.service");
const common_1 = require("@nestjs/common");
const login_type_1 = require("../dto/login.type");
const member_entity_1 = require("../entities/member.entity");
let LoginResolver = class LoginResolver {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async login(username, password, context) {
        try {
            const val = await this.loginService.login(username, password);
            if (!val) {
                throw new Error('Invalid Username or Password');
            }
            if (val.token) {
                context.cookie('__user', val.token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    sameSite: 'none',
                    secure: true,
                });
                return val;
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    getCookieValue(req) {
        const cookieValue = req.cookies['__user'];
        return cookieValue;
    }
    async logout(context) {
        context.res.clearCookie('__user', { httpOnly: true, secure: true, sameSite: 'none' });
        return true;
    }
};
exports.LoginResolver = LoginResolver;
__decorate([
    (0, graphql_1.Mutation)(() => login_type_1.LoginType, { name: 'login' }),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Context)("res")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], LoginResolver.prototype, "getCookieValue", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "logout", null);
exports.LoginResolver = LoginResolver = __decorate([
    (0, graphql_1.Resolver)(() => member_entity_1.Member),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginResolver);
//# sourceMappingURL=login.resolver.js.map