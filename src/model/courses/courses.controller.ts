import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AddCourseDTO } from './dtos/add-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from '../users/users.guard';
import { Request } from 'express';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { TeacherGuard } from '../users/teacher.guard';

@Controller('courses')
export class CoursesController {

    constructor(private courseService:CoursesService){}

    @Post()
    @UseGuards(TeacherGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
      @ApiBody({
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
          description: "JSON Structure to create course object."
      })
      @ApiResponse({status:201, description:"Course has successfully created."})
      @ApiResponse({status:400, description:"Course validation not satisfied."})
      @ApiResponse({status:403, description:"Unauthorized user"})
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
    @ApiResponse({status:200, description:"All course has successfully fetched."})
    async getCourses(){
        return await this.courseService.getAllCourse()
    }
    
    @Get(':id')
    @ApiResponse({status:200, description:"Course has successfully fetched."})
    @ApiResponse({status:400, description:"Course not found."})
    async getCourse(@Param() params: any){
        let course = await this.courseService.getCourse(params.id)
        return course
    }
}
