import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AddCourseDTO } from './dtos/add-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from '../users/users.guard';
import { Request } from 'express';

@Controller('courses')
export class CoursesController {

    constructor(private courseService:CoursesService){}

    @Post()
    @UseGuards(UserGuard)
    @UseInterceptors(FileInterceptor('image'))
    async addCourse(@Req() request:Request, @Body() dto:AddCourseDTO, @UploadedFile() image:Express.Multer.File){
        const user = await request['user']
        try {
            await this.courseService.addCourse(user, dto, image)
        } catch (error) {
            throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, HttpStatus.BAD_REQUEST, {
            cause: error
        });
        }
    }

    @Get()
    async getCourses(){
        return await this.courseService.getAllCourse()
    }

    @Get(':id')
    async getCourse(@Param() params: any){
        let course = await this.courseService.getCourse(params.id)
        return course
    }
}
