import { Module } from '@nestjs/common';
import { ClassStudentsService } from './class-students.service';
import { ClassStudentsController } from './class-students.controller';
import { ClassStudent } from './entities/class-student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ClassStudent])],
  controllers: [ClassStudentsController],
  providers: [ClassStudentsService],
})
export class ClassStudentsModule {}
