import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ClassStudentsService } from './class-students.service';
import { CreateClassStudentDto } from './dto/create-class-student.dto';
import { UpdateClassStudentDto } from './dto/update-class-student.dto';
import { UserGuard } from '../users/users.guard';
import { Request } from 'express';
import { TeacherGuard } from '../users/teacher.guard';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('class-students')
export class ClassStudentsController {
  constructor(private readonly classStudentsService: ClassStudentsService) {}

  @Post()
  @UseGuards(UserGuard)
  @ApiBody({
    type: CreateClassStudentDto,
    description: "JSON structure to enroll student"
  })
  @ApiResponse({status:200, description:"User enrolled."})
  @ApiResponse({status:400, description:"Course not found."})
  @ApiResponse({status:403, description:"Unauthorized."})
  async create(@Req() request:Request,@Body() createClassStudentDto: CreateClassStudentDto) {
    const user = await request['user']
    return this.classStudentsService.create(user.id, createClassStudentDto);
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiResponse({status:200, description:"Course Student fetched."})
  @ApiResponse({status:403, description:"Unauthorized."})
  async findByUser(@Req() request:Request){
    const user = await request['user']
    return this.classStudentsService.findByUser(user.id)
  }
  @Get('/course/:id')
  @UseGuards(TeacherGuard)
  @ApiResponse({status:200, description:"Course Student fetched."})
  @ApiResponse({status:400, description:"Course not found."})
  async findByCourse(@Param('id') id: string){
    return this.classStudentsService.findByCourse(id)
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateClassStudentDto,
    description: "JSON structure to re-enroll student"
  })
  @ApiResponse({status:200, description:"User enrolled."})
  @ApiResponse({status:400, description:"Course not found."})
  @ApiResponse({status:403, description:"Unauthorized."})
  update(@Param('id') id: string, @Body() updateClassStudentDto: UpdateClassStudentDto) {
    return this.classStudentsService.update(id, updateClassStudentDto);
  }
  
  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiResponse({status:200, description:"Course Student removed."})
  @ApiResponse({status:400, description:"Course not found."})
  @ApiResponse({status:403, description:"Unauthorized."})
  async leave(@Req() request: Request, @Param('id') id: string) {
    const user = await request['user']
    return this.classStudentsService.remove(user.id, id);
  }
}
