import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectServeice: ProjectService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File,  @Body('id') id: string) {
    return this.projectServeice.uploadImage(parseInt(id), file);
  }

  @Post('uploads')
  @UseInterceptors(AnyFilesInterceptor())
  uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    //   return this.cloudinaryService.uploadFiles(files);
  }
}
