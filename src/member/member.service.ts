import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { hashPassword, uploadFile } from '../utils/util';
import { SkillMemberService } from 'src/skill-member/skill-member.service';

@Injectable()
export class MemberService {
  // constructor
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly skillService: SkillService,
    @Inject(forwardRef(() => SkillMemberService))
    private readonly skillMemberService: SkillMemberService,
  ) {}

  async create(createMemberInput: CreateMemberInput) {
    // create a new member

    // check if the member already exists
    let member = await this.memberRepository.findOne({
      where: { username: createMemberInput.username },
    });

    if (member) {
      throw new HttpException('Member already exists', HttpStatus.BAD_REQUEST);
    }

    // check is all skills exist
    const skills = await this.skillService.findAllByIds(
      createMemberInput.skillsIds,
    );

    if (skills.length !== createMemberInput.skillsIds.length) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }

    // hash password
    const hashedPassword = await hashPassword(createMemberInput.password);

    // create a new member
    const newMember = this.memberRepository.create(createMemberInput);

    // assign skill to member
    newMember.password = hashedPassword;

    // save member
    member = await this.memberRepository.save(newMember);

    // add skill-member for each skill
    const skillMembers = skills.forEach(async (skill) => {
      return await this.skillMemberService.create({
        skill: skill.id,
        member: member.id,
      });
    });

    member.skillMembers = skillMembers as any;

    return member;
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    // check the member exists
    const member = await this.findOne(id);

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // upload image
    const { secure_url: imageUrl } = await uploadFile(file);

    // update member
    const updatedMember = this.memberRepository.create({
      ...member,
      avatarId: imageUrl,
    });

    // save member
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

  async findOne(id: number) {
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
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    return member;
  }

  async update(id: number, updateMemberInput: UpdateMemberInput) {
    // check the member exists
    const member = await this.findOne(id);

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // check if the member already exists
    let memberExists = await this.memberRepository.findOne({
      where: { username: updateMemberInput.username },
    });

    if (memberExists && memberExists.id !== id) {
      throw new HttpException('Member already exists', HttpStatus.BAD_REQUEST);
    }

    // check is all skills exist
    const skills = await this.skillService.findAllByIds(
      updateMemberInput.skillsIds,
    );

    if (skills.length !== updateMemberInput.skillsIds.length) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }

    // update member
    const updatedMember = this.memberRepository.create(updateMemberInput);

    // save member
    memberExists = await this.memberRepository.save(updatedMember);

    return memberExists;
  }

 async remove(id: number) {
    // check the member exists
    const member =await this.findOne(id);

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    // delete member
    const deletedMember = await this.memberRepository.delete(id);

    return member;

  }
}
