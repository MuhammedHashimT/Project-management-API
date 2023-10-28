/// <reference types="multer" />
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectServeice;
    constructor(projectServeice: ProjectService);
    uploadImage(file: Express.Multer.File, id: string): Promise<import("./entities/project.entity").Project>;
    uploadImages(files: Array<Express.Multer.File>): void;
}
