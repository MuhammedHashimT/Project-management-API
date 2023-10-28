import { Project } from 'src/project/entities/project.entity';
import { SkillMember } from 'src/skill-member/entities/skill-member.entity';
import { Task } from 'src/task/entities/task.entity';
import { Roles } from '../../utils/enums';
export declare class Member {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    avatarId: string;
    isAvailable: boolean;
    role: Roles;
    skillMembers: SkillMember[];
    tasks: Task[];
    managedProjects: Project[];
    createdAt: Date;
    updatedAt: Date;
}
