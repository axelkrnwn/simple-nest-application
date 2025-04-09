import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CreateCourseDetailDto } from './dto/create-course-detail.dto';
import { UpdateCourseDetailDto } from './dto/update-course-detail.dto';
import { UserGuard } from '../users/users.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CourseDetailsController {
  constructor(private readonly courseDetailsService: CourseDetailsService) {}

  @Post("/detail/:courseid")
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Param('courseid') courseid: string, @Body() createCourseDetailDto: CreateCourseDetailDto, @UploadedFile() file:Express.Multer.File) {
    return await this.courseDetailsService.create(createCourseDetailDto, file, courseid);
  }

  @Get('/detail/:id')
  findOne(@Param('id') id: string) {
    return this.courseDetailsService.findOne(id);
  }

  @Patch('/detail/:id')
  update(@Param('id') id: string, @Body() updateCourseDetailDto: UpdateCourseDetailDto) {
    return this.courseDetailsService.update(id, updateCourseDetailDto);
  }

  @Delete('/detail/:id')
  remove(@Param('id') id: string) {
    return this.courseDetailsService.remove(id);
  }
}
