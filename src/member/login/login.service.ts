import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../jwt/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../entities/member.entity';
import { comparePassword } from 'src/utils/util';
import { Roles } from 'src/utils/enums';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly jwtService: JwtService
  ) {}


  // validate JWT token
  async validateJwtToken(token: string) {
    const result = await this.jwtService.verify(token);
    return result;
  }

  // decode JWT token
  async decodeJwtToken(token: string) {
    const result = await this.jwtService.decode(token);
    return result;
  }

  async verifyUser(id:number) {
    const user = await this.memberRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async login(username : string, password : string) {

    const adminUserName = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username === adminUserName && password === adminPassword) {
      const payload : JwtPayload  = {
        id: 0,
        username: username,
        role: Roles.ADMIN,
        sub : 0,
      };
      const token = await this.jwtService.sign(payload);
      return {
        token: token,
        admin: {
          id: 0,
          username: username,
          role: Roles.ADMIN,
        },
      };
    }else{
 // find the user in the database
 const user = await this.memberRepository.findOne({
  where: {
    username: username,
  },
});

if (!user) {
  throw new HttpException('Can not find the user', HttpStatus.UNAUTHORIZED);
}

// validate the password
const valid = await comparePassword(password, user.password);

if (!valid) {
  throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
}

// generate the token
const payload : JwtPayload  = {
  id: user.id,
  username: user.username,
  role: user.role,
  sub : user.id,
};

const token = await this.jwtService.sign(payload);

return {
  token: token,
  admin: user,
};
    }

   

  }

}