import { Project } from 'src/project/entities/project.entity';
import { Skill } from 'src/skill/entities/skill.entity';
export declare class SkillProject {
    id: number;
    skill: Skill;
    project: Project;
}
