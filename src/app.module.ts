import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './model/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/users/entities/users.entity';
import { CoursesModule } from './model/courses/courses.module';
import { DatabaseModule } from './providers/database/database.module';
import { Course } from './model/courses/entities/courses.entity';
import { CourseDetailsModule } from './model/course-details/course-details.module';
import { AssignmentsModule } from './model/assignments/assignments.module';
import { SubmissionsModule } from './model/submissions/submissions.module';
import { Assignment } from './model/assignments/entities/assignment.entity';
import { Submission } from './model/submissions/entities/submission.entity';
import { CourseDetail } from './model/course-details/entities/course-detail.entity';
import { ClassStudentsModule } from './model/class-students/class-students.module';
import { ClassStudent } from './model/class-students/entities/class-student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "3306"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 60 * 60 * 1000,
      entities: [User, ClassStudent, Course, Assignment, Submission, CourseDetail],
      synchronize: true,
    }), UserModule, AssignmentsModule, CoursesModule, CourseDetailsModule, SubmissionsModule, ClassStudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
