import { Roles } from "src/utils/enums";


export interface JwtPayload {
  sub: number; // User ID
  id : number;
  username: string; // User's username
  role: Roles; // User's roles
}