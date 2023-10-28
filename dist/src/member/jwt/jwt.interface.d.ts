import { Roles } from "../../utils/enums";
export interface JwtPayload {
    sub: number;
    id: number;
    username: string;
    role: Roles;
}
