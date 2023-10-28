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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const member_entity_1 = require("../entities/member.entity");
const util_1 = require("../../utils/util");
const enums_1 = require("../../utils/enums");
let LoginService = class LoginService {
    constructor(memberRepository, jwtService) {
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
    }
    async validateJwtToken(token) {
        const result = await this.jwtService.verify(token);
        return result;
    }
    async decodeJwtToken(token) {
        const result = await this.jwtService.decode(token);
        return result;
    }
    async verifyUser(id) {
        const user = await this.memberRepository.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            return user;
        }
        return null;
    }
    async login(username, password) {
        const adminUserName = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (username === adminUserName && password === adminPassword) {
            const payload = {
                id: 0,
                username: username,
                role: enums_1.Roles.ADMIN,
                sub: 0,
            };
            const token = await this.jwtService.sign(payload);
            return {
                token: token,
                admin: {
                    id: 0,
                    username: username,
                    role: enums_1.Roles.ADMIN,
                },
            };
        }
        else {
            const user = await this.memberRepository.findOne({
                where: {
                    username: username,
                },
            });
            if (!user) {
                throw new common_1.HttpException('Can not find the user', common_1.HttpStatus.UNAUTHORIZED);
            }
            const valid = await (0, util_1.comparePassword)(password, user.password);
            if (!valid) {
                throw new common_1.HttpException('Invalid Password', common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role,
                sub: user.id,
            };
            const token = await this.jwtService.sign(payload);
            return {
                token: token,
                admin: user,
            };
        }
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], LoginService);
//# sourceMappingURL=login.service.js.map