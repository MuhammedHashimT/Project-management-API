/// <reference types="multer" />
import { MemberService } from './member.service';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    uploadImage(file: Express.Multer.File, id: string): Promise<import("./entities/member.entity").Member>;
    uploadImages(files: Array<Express.Multer.File>): void;
}
