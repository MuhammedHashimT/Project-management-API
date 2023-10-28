import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoginService } from '../login/login.service';
import { Roles } from '../../utils/enums';
import { MemberService } from '../member.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly memberService;
    private readonly loginService;
    constructor(reflector: Reflector, memberService: MemberService, loginService: LoginService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    hasRoleTOJudge(context: ExecutionContext): Promise<void>;
}
export declare const HasRoles: (...roles: Roles[]) => import("@nestjs/common").CustomDecorator<string>;
