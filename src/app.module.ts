import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './model/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/users/entities/users.entity';
import { CoursesModule } from './model/courses/courses.module';
import { DatabaseModule } from './providers/database/database.module';
import { Course } from './model/courses/entities/courses.entity';

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
      entities: [User, Course],
      synchronize: true,
    }), UserModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
