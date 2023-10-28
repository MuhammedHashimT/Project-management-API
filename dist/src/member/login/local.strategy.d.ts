import { LoginService } from './login.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private loginService;
    constructor(loginService: LoginService);
    validate(id: number, password: string): Promise<any>;
}
export {};
