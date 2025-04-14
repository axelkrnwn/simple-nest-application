import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Submission } from '../submissions/entities/submission.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Assignment, Submission]),
     MulterModule.register({
              storage: diskStorage({
                destination: './uploads/assignments',
                filename: (req, file, cb) => {
                  console.log(req.body)
                  const filename = `${Date.now()}-${req.body['title']}-${file.originalname}`;
                  cb(null, filename);
                },
              }),
            }),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
