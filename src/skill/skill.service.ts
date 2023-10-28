import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SkillService {
  // constructor
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

 async create(createSkillInput: CreateSkillInput) {
    // check if the skill already exists
    const skill = await this.skillRepository.findOne({
      where: { title: createSkillInput.title },
    });

    if (skill) {
      throw new HttpException('Skill already exists', HttpStatus.BAD_REQUEST);
    }

    // create a new skill

    const newSkill = this.skillRepository.create(createSkillInput);

    // save skill
    await this.skillRepository.save(newSkill);

    return newSkill;

  }

  async findAll() {
    const skills = await this.skillRepository.find({
      relations: ['skillMembers', 'skillProject'],
    });
    return skills;
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({
      where: { id },
      relations: ['skillMembers', 'skillProject'],
    });
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }

    return skill;
  }

  async findAllByIds(ids: number[]) {
    console.log( ids);
    const skills = await this.skillRepository.findBy({ id: In(ids) })
    return skills;
  }

 async update(id: number, updateSkillInput: UpdateSkillInput) {
    // check if the skill exists
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }

    // update the skill by create and save
    const updatedSkill = this.skillRepository.create({
      ...skill,
      ...updateSkillInput,
    });

    return this.skillRepository.save(updatedSkill);
  }

 async remove(id: number) {
    // check if the skill exists
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }

    await this.skillRepository.delete({ id });

    return skill;
  }
}
