/// <reference types="multer" />
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { SkillService } from 'src/skill/skill.service';
import { SkillMemberService } from 'src/skill-member/skill-member.service';
import { JwtPayload } from './jwt/jwt.interface';
import { LoginService } from './login/login.service';
export declare class MemberService {
    private memberRepository;
    private readonly skillService;
    private readonly skillMemberService;
    private readonly LoginService;
    constructor(memberRepository: Repository<Member>, skillService: SkillService, skillMemberService: SkillMemberService, LoginService: LoginService);
    create(createMemberInput: CreateMemberInput): Promise<Member>;
    uploadImage(id: number, file: Express.Multer.File): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: number): Promise<Member>;
    update(id: number, updateMemberInput: UpdateMemberInput): Promise<Member>;
    remove(id: number): Promise<Member>;
    checkLoggedIn(req: any): Promise<Member | JwtPayload>;
}
