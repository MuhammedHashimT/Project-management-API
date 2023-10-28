import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { MemberService } from 'src/member/member.service';
import { ProjectService } from 'src/project/project.service';
export declare class TaskService {
    private taskRepository;
    private readonly projectService;
    private readonly memberService;
    constructor(taskRepository: Repository<Task>, projectService: ProjectService, memberService: MemberService);
    create(createTaskInput: CreateTaskInput): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task>;
    remove(id: number): Promise<Task>;
    completeTask(id: number): Promise<Task>;
    verifyTask(id: number): Promise<Task>;
    rejectTask(id: number): Promise<Task>;
}
