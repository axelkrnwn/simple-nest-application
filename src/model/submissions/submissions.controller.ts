import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, HttpException, HttpStatus } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { UserGuard } from '../users/users.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherGuard } from '../users/teacher.guard';

@Controller('courses')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post(':assignmentid/submission')
  @Post(':assignmentid/submission/:id')
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() request:Request, 
    @Param('assignmentid') assignmentid: string, 
    @Body() createSubmissionDto: CreateSubmissionDto, 
    @UploadedFile() file:Express.Multer.File,
    @Param('id') id?: string, 
    ) {
      try {
        const user = await request['user']
        return this.submissionsService.create(id, user, assignmentid,createSubmissionDto, file);
      } catch (error) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, HttpStatus.BAD_REQUEST, {
            cause: error
        });
      }
  }

  @Get(':assignmentid')
  @UseGuards(TeacherGuard)
  findAll(@Param('assignmentid') assignmentid: string) {
    return this.submissionsService.findAll(assignmentid);
  }

  @Get('submission/:id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }

  @Patch('submission/:id')
  @UseGuards(TeacherGuard)
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete('submission/:id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
