import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectModule } from 'src/project/project.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task]) , ProjectModule , MemberModule],
  providers: [TaskResolver, TaskService],
  exports:[TaskService]
})
export class TaskModule {}
