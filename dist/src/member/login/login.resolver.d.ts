import { LoginService } from './login.service';
import { Response } from 'express';
import { Member } from '../entities/member.entity';
export declare class LoginResolver {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(username: string, password: string, context: Response): Promise<{
        token: string;
        admin: {
            id: number;
            username: string;
            role: import("../../utils/enums").Roles;
        };
    } | {
        token: string;
        admin: Member;
    }>;
    getCookieValue(req: any): string;
    logout(context: any): Promise<boolean>;
}
