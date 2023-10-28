import { Roles } from '../../utils/enums';
export declare class CreateMemberInput {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    role: Roles;
    skillsIds: number[];
}
