import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherGuard } from '../users/teacher.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller('courses')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post("/assignment/:courseid")
  @UseGuards(TeacherGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          deadline: {type: 'string'},
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      description: "JSON Structure to create assignment."
  })
  @ApiResponse({status:201, description:"Assignment added."})
  @ApiResponse({status:400, description:"Invalid request."})
  @ApiResponse({status:401, description:"Unauthorized."})
  create(@Param('courseid') courseid: string, @Body() createAssignmentDto: CreateAssignmentDto, @UploadedFile() file:Express.Multer.File) {
    return this.assignmentsService.create(courseid, createAssignmentDto, file);
  }
  
  @Get('/assignment/:id')
  @ApiResponse({status:200, description:"Assignment added."})
  @ApiResponse({status:400, description:"Course not found."})
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch('/assignment/:id')
  @ApiBody({
    type: UpdateAssignmentDto,
    description: "JSON structure to update assignment"
  })
  @UseGuards(TeacherGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor("file"))
  @ApiResponse({status:200, description:"Assignment updated."})
  @ApiResponse({status:400, description:"Invalid request."})
  @ApiResponse({status:401, description:"Unauthorized."})
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto, @UploadedFile() file:Express.Multer.File) {
    console.log(updateAssignmentDto)
    return this.assignmentsService.update(id, updateAssignmentDto, file);
  }

  @Delete('/assignment/:id')
  @UseGuards(TeacherGuard)
  
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Assignment updated."})
  @ApiResponse({status:400, description:"Course not found."})
  @ApiResponse({status:401, description:"Unauthorized."})
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}
