/// <reference types="multer" />
import { CloudinaryResponse } from 'src/member/cloudinary-response';
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare function uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
