"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const skill_module_1 = require("./skill/skill.module");
const project_module_1 = require("./project/project.module");
const member_module_1 = require("./member/member.module");
const task_module_1 = require("./task/task.module");
const skill_member_module_1 = require("./skill-member/skill-member.module");
const skill_project_module_1 = require("./skill-project/skill-project.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: ['dist/**/entities/*.entity{.ts,.js}'],
                    autoLoadEntities: true,
                    ssl: { "rejectUnauthorized": true },
                }),
                inject: [config_1.ConfigService],
            }),
            skill_member_module_1.SkillMemberModule,
            skill_project_module_1.SkillProjectModule,
            skill_module_1.SkillModule,
            project_module_1.ProjectModule,
            member_module_1.MemberModule,
            task_module_1.TaskModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: '/tmp/schema.gql',
                context: ({ req, res }) => ({ req, res }),
                playground: {
                    settings: {
                        'request.credentials': 'include',
                    },
                },
                cache: 'bounded',
                introspection: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map