import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CreateCourseDetailDto } from './dto/create-course-detail.dto';
import { UpdateCourseDetailDto } from './dto/update-course-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProduces, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { TeacherGuard } from '../users/teacher.guard';

@Controller('courses')
export class CourseDetailsController {
  constructor(private readonly courseDetailsService: CourseDetailsService) {}

  @Post("/detail/:courseid")
  @UseGuards(TeacherGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('file'))
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
  @ApiResponse({status:401, description:"Unauthorized user"})
  async create(@Param('courseid') courseid: string, @Body() createCourseDetailDto: CreateCourseDetailDto, 
  @UploadedFile() file:Express.Multer.File) {
    return await this.courseDetailsService.create(createCourseDetailDto, file, courseid);
  }

  @Get('/detail/:id')
  @ApiResponse({status:200, description:"Course has successfully fetehed."})
  @ApiResponse({status:400, description:"Course not found."})
  findOne(@Param('id') id: string) {
    return this.courseDetailsService.findOne(id);
  }


  @Patch('/detail/:id')
  @UseGuards(TeacherGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: UpdateCourseDetailDto,
    description: "JSON Structure to create course object."
  })
  @ApiResponse({status:200, description:"Course has successfully updated."})
  @ApiResponse({status:400, description:"Course validation not satisfied."})
  @ApiResponse({status:401, description:"Unauthorized user"})
  update(@Param('id') id: string, @Body() updateCourseDetailDto: UpdateCourseDetailDto) {
    return this.courseDetailsService.update(id, updateCourseDetailDto);
  }

  @Delete('/detail/:id')
  @UseGuards(TeacherGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Course has successfully fetehed."})
  @ApiResponse({status:400, description:"Course not found."})
  remove(@Param('id') id: string) {
    return this.courseDetailsService.remove(id);
  }
}
