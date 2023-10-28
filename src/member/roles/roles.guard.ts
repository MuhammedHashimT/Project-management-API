import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { LoginService } from '../login/login.service';
import { JwtPayload } from '../jwt/jwt.interface';
import { Roles } from '../../utils/enums';
import { MemberService } from '../member.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly memberService: MemberService,
    private readonly loginService: LoginService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles specified, allow access
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // get the cookie
    const cookie = req.cookies['__user'];

    // if the cookie is not set, return false
    if (!cookie) {
      return false;
    }

    // if the cookie is set, verify the token
    const token: JwtPayload = await this.loginService.validateJwtToken(cookie);


    // if the token is not valid, return false
    // if (!token) {
    //   this.hasRoleTOJudge(context);
    // }

    // if admin return true

    if (token.role === Roles.ADMIN) {
      // check is the user is admin
      // const adminUserName = process.env.ADMIN_USERNAME;
      // const adminPassword = process.env.ADMIN_PASSWORD;

      return true;
    }

    // Assign roles based on the username
    const userId = token.id; // Assuming the username is sent in the request headers

    if (!userId) {
      return false;
    }

    // find the user in the database
    const user = await this.memberService.findOne(userId);


    if (!user) {
      return false;
    }

    // Assign the user to the request object
    req.user = user;

    // Check if the user has access to the requested role
    return requiredRoles.some((role) => req.user?.role === role);
  }

  // This method is used by the AuthGuard to check if the user has access to Judge role

  async hasRoleTOJudge(context: ExecutionContext) {}
}

// The HasRoles decorator is used to assign roles to a resolver
export const HasRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
