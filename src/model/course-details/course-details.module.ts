import { Module } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CourseDetailsController } from './course-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDetail } from './entities/course-detail.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[
    TypeOrmModule.forFeature([CourseDetail]),
    MulterModule.register({
          storage: diskStorage({
            destination: './uploads/course-details',
            filename: (req, file, cb) => {
              console.log(req.body)
              const filename = `${Date.now()}-${req.body['title']}-${file.originalname}`;
              cb(null, filename);
            },
          }),
        }),
  ],
  controllers: [CourseDetailsController],
  providers: [CourseDetailsService],
})
export class CourseDetailsModule {}
