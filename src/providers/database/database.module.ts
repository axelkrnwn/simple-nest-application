import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/users/entities/users.entity';
import { ClassStudent } from 'src/model/class-students/entities/class-student.entity';
import { Course } from 'src/model/courses/entities/courses.entity';
import { Assignment } from 'src/model/assignments/entities/assignment.entity';
import { Submission } from 'src/model/submissions/entities/submission.entity';
import { CourseDetail } from 'src/model/course-details/entities/course-detail.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 60 * 60 * 1000,
    entities: [User, ClassStudent, Course, Assignment, Submission, CourseDetail],
    synchronize: true,
  })]
})
export class DatabaseModule {}