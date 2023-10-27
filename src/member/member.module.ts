import { Module, forwardRef } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { SkillModule } from 'src/skill/skill.module';
import { SkillMemberModule } from 'src/skill-member/skill-member.module';
import { LoginResolver } from './login/login.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login/login.service';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => SkillModule),
    forwardRef(() => SkillMemberModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [
    MemberResolver,
    MemberService,
    LoginService,
    LoginResolver,
    RolesGuard,
  ],
  exports: [MemberService , LoginService],
})
export class MemberModule {}
