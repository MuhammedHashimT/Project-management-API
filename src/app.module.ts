import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { MemberModule } from './member/member.module';
import { TaskModule } from './task/task.module';
import { SkillMemberModule } from './skill-member/skill-member.module';
import { SkillProjectModule } from './skill-project/skill-project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync(
      // dataSourceOptions
      {
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: ['dist/**/entities/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          ssl: { "rejectUnauthorized": true },
          // migrationsTableName: 'migrations',
          // migrations: ['dist/src/database/migrations/*.js'],
          // configService.get<string>('MYSQL_ATTR_SSL_CA') ,
          // cli: {
          //   migrationsDir: 'src/database/migrations',
          // },
          // namingStrategy: new SnakeNamingStrategy(),
          // url:configService.get<string>('DATABASE_URL'),
        }),

        inject: [ConfigService],
      },
    ),

    

    SkillMemberModule,

    SkillProjectModule,
    
    SkillModule,

    ProjectModule,

    MemberModule,

    TaskModule,

    // graphql configuration

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req , res }) => ({ req, res }),
      playground:{
        settings: {
          'request.credentials': 'include',
        },
      },
      cache: 'bounded',
      introspection:true ,
    //  cors: {
    //     origin: true,
    //     credentials: true,

    //   },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
