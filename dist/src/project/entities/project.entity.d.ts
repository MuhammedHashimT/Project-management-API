import { Member } from 'src/member/entities/member.entity';
import { SkillProject } from 'src/skill-project/entities/skill-project.entity';
import { Task } from 'src/task/entities/task.entity';
export declare class Project {
    id: number;
    title: string;
    description: string;
    duration: Date;
    imageId: string;
    skillProject: SkillProject[];
    tasks: Task[];
    manager: Member;
    createdAt: Date;
    updatedAt: Date;
}
