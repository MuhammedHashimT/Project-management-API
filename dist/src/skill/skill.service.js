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
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const skill_entity_1 = require("./entities/skill.entity");
const typeorm_2 = require("typeorm");
let SkillService = class SkillService {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async create(createSkillInput) {
        const skill = await this.skillRepository.findOne({
            where: { title: createSkillInput.title },
        });
        if (skill) {
            throw new common_1.HttpException('Skill already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const newSkill = this.skillRepository.create(createSkillInput);
        await this.skillRepository.save(newSkill);
        return newSkill;
    }
    async findAll() {
        const skills = await this.skillRepository.find({
            relations: ['skillMembers', 'skillProject'],
        });
        return skills;
    }
    async findOne(id) {
        const skill = await this.skillRepository.findOne({
            where: { id },
            relations: ['skillMembers', 'skillProject'],
        });
        if (!skill) {
            throw new common_1.HttpException('Skill not found', common_1.HttpStatus.NOT_FOUND);
        }
        return skill;
    }
    async findAllByIds(ids) {
        console.log(ids);
        const skills = await this.skillRepository.findBy({ id: (0, typeorm_2.In)(ids) });
        return skills;
    }
    async update(id, updateSkillInput) {
        const skill = await this.skillRepository.findOne({ where: { id } });
        if (!skill) {
            throw new common_1.HttpException('Skill not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedSkill = this.skillRepository.create({
            ...skill,
            ...updateSkillInput,
        });
        return this.skillRepository.save(updatedSkill);
    }
    async remove(id) {
        const skill = await this.skillRepository.findOne({ where: { id } });
        if (!skill) {
            throw new common_1.HttpException('Skill not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.skillRepository.delete({ id });
        return skill;
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillService);
//# sourceMappingURL=skill.service.js.map