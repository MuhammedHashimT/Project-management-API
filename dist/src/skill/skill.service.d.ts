import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
export declare class SkillService {
    private skillRepository;
    constructor(skillRepository: Repository<Skill>);
    create(createSkillInput: CreateSkillInput): Promise<Skill>;
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill>;
    findAllByIds(ids: number[]): Promise<Skill[]>;
    update(id: number, updateSkillInput: UpdateSkillInput): Promise<Skill>;
    remove(id: number): Promise<Skill>;
}
