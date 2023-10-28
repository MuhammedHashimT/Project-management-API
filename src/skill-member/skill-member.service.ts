import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateSkillMemberInput } from './dto/create-skill-member.input';
import { UpdateSkillMemberInput } from './dto/update-skill-member.input';
import { SkillService } from 'src/skill/skill.service';
import { MemberService } from 'src/member/member.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillMember } from './entities/skill-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillMemberService {
  // constructor
  constructor(
    @InjectRepository(SkillMember)
    private skillMemberRepository: Repository<SkillMember>,
    private readonly skillService: SkillService,
    @Inject(forwardRef(() => MemberService))
    private readonly memberService: MemberService,
  ) {}

  async create(createSkillMemberInput: CreateSkillMemberInput) {
    // check the skill exists
    const skill = await this.skillService.findOne(createSkillMemberInput.skill);
    // check the member exists
    const member = await this.memberService.findOne(
      createSkillMemberInput.member,
    );

    // create a new skillMember
    const newSkillMember = this.skillMemberRepository.create({
      skill,
      member,
    });

    // save skillMember
    await this.skillMemberRepository.save(newSkillMember);

    return newSkillMember;
  }

  async findAll() {
    const skillMembers = await this.skillMemberRepository.find({
      relations: ['skill', 'member'],
    });
    return skillMembers;
  }

  async findOne(id: number) {
    const skillMember = await this.skillMemberRepository.findOne({
      where: { id },
      relations: ['skill', 'member'],
    });
    if (!skillMember) {
      throw new HttpException('SkillMember not found', HttpStatus.NOT_FOUND);
    }

    return skillMember;
  }

  async update(id: number, updateSkillMemberInput: UpdateSkillMemberInput) {
    // check the skill exists
    const skill = await this.skillService.findOne(updateSkillMemberInput.skill);
    // check the member exists
    const member = await this.memberService.findOne(
      updateSkillMemberInput.member,
    );

    // check if the skillMember exists
    await this.findOne(id);

    // create a new skillMember
    const newSkillMember = this.skillMemberRepository.create({
      id,
      skill,
      member,
    });

    // save skillMember
    await this.skillMemberRepository.save(newSkillMember);

    return newSkillMember;
  }

  async remove(id: number) {
    // check if the skillMember exists
    const skillMember = this.findOne(id);

    if (!skillMember) {
      throw new HttpException('SkillMember not found', HttpStatus.NOT_FOUND);
    }

    // delete skillMember
    await this.skillMemberRepository.delete(id);

    return skillMember;
  }
}
