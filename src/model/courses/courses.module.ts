import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(req.body)
          const filename = `${Date.now()}-${req.body['title']}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [CoursesService],
  controllers: [CoursesController]
})
export class CoursesModule {}
