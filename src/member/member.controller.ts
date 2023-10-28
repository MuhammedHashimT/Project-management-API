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
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File ,  @Body('id') id: string) {
      return this.memberService.uploadImage( parseInt(id) ,file );
  }

  @Post('uploads')
  @UseInterceptors(AnyFilesInterceptor())
  uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    //   return this.memberService.uploadFiles(files);
  }
}
