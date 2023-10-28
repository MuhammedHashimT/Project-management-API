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
exports.SkillMemberService = void 0;
const common_1 = require("@nestjs/common");
const skill_service_1 = require("../skill/skill.service");
const member_service_1 = require("../member/member.service");
const typeorm_1 = require("@nestjs/typeorm");
const skill_member_entity_1 = require("./entities/skill-member.entity");
const typeorm_2 = require("typeorm");
let SkillMemberService = class SkillMemberService {
    constructor(skillMemberRepository, skillService, memberService) {
        this.skillMemberRepository = skillMemberRepository;
        this.skillService = skillService;
        this.memberService = memberService;
    }
    async create(createSkillMemberInput) {
        const skill = await this.skillService.findOne(createSkillMemberInput.skill);
        const member = await this.memberService.findOne(createSkillMemberInput.member);
        const newSkillMember = this.skillMemberRepository.create({
            skill,
            member,
        });
        await this.skillMemberRepository.save(newSkillMember);
        return newSkillMember;
    }
    async findAll() {
        const skillMembers = await this.skillMemberRepository.find({
            relations: ['skill', 'member'],
        });
        return skillMembers;
    }
    async findOne(id) {
        const skillMember = await this.skillMemberRepository.findOne({
            where: { id },
            relations: ['skill', 'member'],
        });
        if (!skillMember) {
            throw new common_1.HttpException('SkillMember not found', common_1.HttpStatus.NOT_FOUND);
        }
        return skillMember;
    }
    async update(id, updateSkillMemberInput) {
        const skill = await this.skillService.findOne(updateSkillMemberInput.skill);
        const member = await this.memberService.findOne(updateSkillMemberInput.member);
        await this.findOne(id);
        const newSkillMember = this.skillMemberRepository.create({
            id,
            skill,
            member,
        });
        await this.skillMemberRepository.save(newSkillMember);
        return newSkillMember;
    }
    async remove(id) {
        const skillMember = this.findOne(id);
        if (!skillMember) {
            throw new common_1.HttpException('SkillMember not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.skillMemberRepository.delete(id);
        return skillMember;
    }
};
exports.SkillMemberService = SkillMemberService;
exports.SkillMemberService = SkillMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_member_entity_1.SkillMember)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => member_service_1.MemberService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        skill_service_1.SkillService,
        member_service_1.MemberService])
], SkillMemberService);
//# sourceMappingURL=skill-member.service.js.map