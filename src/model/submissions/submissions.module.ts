import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { Submission } from './entities/submission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Assignment } from '../assignments/entities/assignment.entity';
import { ClassStudent } from '../class-students/entities/class-student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Submission, Assignment, ClassStudent]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/submissions',
        filename: (req, file, cb) => {
          console.log(req.params)
          const filename = `${Date.now()}-${req.params['assignmentid']}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
