import { Member } from 'src/member/entities/member.entity';
import { Project } from 'src/project/entities/project.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isVerified: boolean;
    duration: Date;
    member: Member;
    project: Project;
    createdAt: Date;
    updatedAt: Date;
}
