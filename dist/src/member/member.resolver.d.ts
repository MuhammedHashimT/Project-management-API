import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
export declare class MemberResolver {
    private readonly memberService;
    constructor(memberService: MemberService);
    createMember(createMemberInput: CreateMemberInput): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: number): Promise<Member>;
    updateMember(updateMemberInput: UpdateMemberInput): Promise<Member>;
    removeMember(id: number): Promise<Member>;
    checkLoggedIn(request: any): Promise<Member | import("./jwt/jwt.interface").JwtPayload>;
}
