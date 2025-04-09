import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from '../users/users.guard';

@Controller('courses')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post("/assignment/:courseid")
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor("file"))
  create(@Param('courseid') courseid: string, @Body() createAssignmentDto: CreateAssignmentDto, @UploadedFile() file:Express.Multer.File) {
    return this.assignmentsService.create(courseid, createAssignmentDto, file);
  }

  @Get('/assignment/:id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch('/assignment/:id')
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete('/assignment/:id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}
