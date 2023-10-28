"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_service_1 = require("./task.service");
const task_entity_1 = require("./entities/task.entity");
const create_task_input_1 = require("./dto/create-task.input");
const update_task_input_1 = require("./dto/update-task.input");
const roles_guard_1 = require("../member/roles/roles.guard");
const enums_1 = require("../utils/enums");
const common_1 = require("@nestjs/common");
let TaskResolver = class TaskResolver {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskInput) {
        return this.taskService.create(createTaskInput);
    }
    findAll() {
        return this.taskService.findAll();
    }
    findOne(id) {
        return this.taskService.findOne(id);
    }
    updateTask(updateTaskInput) {
        return this.taskService.update(updateTaskInput.id, updateTaskInput);
    }
    removeTask(id) {
        return this.taskService.remove(id);
    }
    verifyTask(id) {
        return this.taskService.verifyTask(id);
    }
    completeTask(id) {
        return this.taskService.completeTask(id);
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN, enums_1.Roles.MANAGER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('createTaskInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_input_1.CreateTaskInput]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_entity_1.Task], { name: 'tasks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => task_entity_1.Task, { name: 'task' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN, enums_1.Roles.MANAGER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('updateTaskInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_input_1.UpdateTaskInput]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN, enums_1.Roles.MANAGER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "removeTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN, enums_1.Roles.MANAGER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "verifyTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    (0, roles_guard_1.HasRoles)(enums_1.Roles.ADMIN, enums_1.Roles.MANAGER, enums_1.Roles.MEMBER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "completeTask", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_entity_1.Task),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskResolver);
//# sourceMappingURL=task.resolver.js.map