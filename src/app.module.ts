import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './model/users/users.module';
import { CoursesModule } from './model/courses/courses.module';
import { DatabaseModule } from './providers/database/database.module';
import { CourseDetailsModule } from './model/course-details/course-details.module';
import { AssignmentsModule } from './model/assignments/assignments.module';
import { SubmissionsModule } from './model/submissions/submissions.module';
import { ClassStudentsModule } from './model/class-students/class-students.module';
import { SeederModule } from './database/seeder/seeder.module';

@Module({
  imports: [
    DatabaseModule, UserModule, AssignmentsModule, CoursesModule, CourseDetailsModule, SubmissionsModule, ClassStudentsModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
