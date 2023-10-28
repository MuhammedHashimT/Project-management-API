import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../entities/member.entity';
import { Roles } from '../../utils/enums';
export declare class LoginService {
    private memberRepository;
    private readonly jwtService;
    constructor(memberRepository: Repository<Member>, jwtService: JwtService);
    validateJwtToken(token: string): Promise<any>;
    decodeJwtToken(token: string): Promise<string | {
        [key: string]: any;
    }>;
    verifyUser(id: number): Promise<Member>;
    login(username: string, password: string): Promise<{
        token: string;
        admin: {
            id: number;
            username: string;
            role: Roles;
        };
    } | {
        token: string;
        admin: Member;
    }>;
}
