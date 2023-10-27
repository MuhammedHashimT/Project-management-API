import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { HasRoles, RolesGuard } from 'src/member/roles/roles.guard';
import { Roles } from 'src/utils/enums';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  @HasRoles(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(RolesGuard)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  @HasRoles(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(RolesGuard)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  @HasRoles(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(RolesGuard)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
