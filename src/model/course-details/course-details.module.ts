import { Module } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CourseDetailsController } from './course-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDetail } from './entities/course-detail.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CourseDetail]),
  ],
  controllers: [CourseDetailsController],
  providers: [CourseDetailsService],
})
export class CourseDetailsModule {}
