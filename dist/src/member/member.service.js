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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("./entities/member.entity");
const typeorm_2 = require("typeorm");
const skill_service_1 = require("../skill/skill.service");
const util_1 = require("../utils/util");
const skill_member_service_1 = require("../skill-member/skill-member.service");
const login_service_1 = require("./login/login.service");
const enums_1 = require("../utils/enums");
let MemberService = class MemberService {
    constructor(memberRepository, skillService, skillMemberService, LoginService) {
        this.memberRepository = memberRepository;
        this.skillService = skillService;
        this.skillMemberService = skillMemberService;
        this.LoginService = LoginService;
    }
    async create(createMemberInput) {
        let member = await this.memberRepository.findOne({
            where: { username: createMemberInput.username },
        });
        if (member) {
            throw new common_1.HttpException('Member already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const skills = await this.skillService.findAllByIds(createMemberInput.skillsIds);
        if (skills.length !== createMemberInput.skillsIds.length) {
            throw new common_1.HttpException('Skill not found', common_1.HttpStatus.NOT_FOUND);
        }
        const hashedPassword = await (0, util_1.hashPassword)(createMemberInput.password);
        const newMember = this.memberRepository.create(createMemberInput);
        newMember.password = hashedPassword;
        member = await this.memberRepository.save(newMember);
        const skillMembers = skills.forEach(async (skill) => {
            return await this.skillMemberService.create({
                skill: skill.id,
                member: member.id,
            });
        });
        member.skillMembers = skillMembers;
        return member;
    }
    async uploadImage(id, file) {
        const member = await this.findOne(id);
        if (!member) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        const { secure_url: imageUrl } = await (0, util_1.uploadFile)(file);
        const updatedMember = this.memberRepository.create({
            ...member,
            avatarId: imageUrl,
        });
        const memberExists = await this.memberRepository.save(updatedMember);
        return memberExists;
    }
    async findAll() {
        const members = await this.memberRepository.find({
            relations: [
                'skillMembers',
                'tasks',
                'skillMembers.skill',
                'managedProjects',
            ],
        });
        return members;
    }
    async findOne(id) {
        const member = await this.memberRepository.findOne({
            where: { id },
            relations: [
                'skillMembers',
                'tasks',
                'skillMembers.skill',
                'managedProjects',
            ],
        });
        if (!member) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        return member;
    }
    async update(id, updateMemberInput) {
        const member = await this.findOne(id);
        if (!member) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        let memberExists = await this.memberRepository.findOne({
            where: { username: updateMemberInput.username },
        });
        if (memberExists && memberExists.id !== id) {
            throw new common_1.HttpException('Member already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        let skills = [];
        if (updateMemberInput.skillsIds) {
            skills = await this.skillService.findAllByIds(updateMemberInput.skillsIds);
            if (skills.length !== updateMemberInput.skillsIds.length) {
                throw new common_1.HttpException('Skill not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        const updatedMember = this.memberRepository.create(updateMemberInput);
        memberExists = await this.memberRepository.save(updatedMember);
        return memberExists;
    }
    async remove(id) {
        const member = await this.findOne(id);
        if (!member) {
            throw new common_1.HttpException('Member not found', common_1.HttpStatus.NOT_FOUND);
        }
        const deletedMember = await this.memberRepository.delete(id);
        return member;
    }
    async checkLoggedIn(req) {
        const cookie = req.cookies['__user'];
        if (!cookie) {
            throw new common_1.HttpException('User not logged In', common_1.HttpStatus.FORBIDDEN);
        }
        const token = await this.LoginService.validateJwtToken(cookie);
        if (token.role === enums_1.Roles.ADMIN) {
            return token;
        }
        const id = token.id;
        if (!id) {
            throw new common_1.HttpException('User not logged In', common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.HttpException('User not logged In', common_1.HttpStatus.FORBIDDEN);
        }
        req.user = user;
        return user;
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => skill_member_service_1.SkillMemberService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        skill_service_1.SkillService,
        skill_member_service_1.SkillMemberService,
        login_service_1.LoginService])
], MemberService);
//# sourceMappingURL=member.service.js.map