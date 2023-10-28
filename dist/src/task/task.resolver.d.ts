import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
export declare class TaskResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskInput: CreateTaskInput): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    updateTask(updateTaskInput: UpdateTaskInput): Promise<Task>;
    removeTask(id: number): Promise<Task>;
    verifyTask(id: number): Promise<Task>;
    completeTask(id: number): Promise<Task>;
}
