import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, HttpException, HttpStatus } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { UserGuard } from '../users/users.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherGuard } from '../users/teacher.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller('courses')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get(':assignmentid/me')
  @UseGuards(UserGuard)
  
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Submissions fetched."})
  @ApiResponse({status:400, description:"Invalid request."})
  @ApiResponse({status:401, description:"Unauthorized."})
  async findSubmission(@Req() request:Request, @Param('assignmentid') assignmentid: string) {
    const user = await request['user']
    console.log("fetching", user.id)

    return this.submissionsService.findByAssignmentUser(user.id,assignmentid);
  }

  @Post(':assignmentid/submission')
  @Post(':assignmentid/submission/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth('access-token')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      description: "JSON Structure to create course object."
  })
  @ApiResponse({status:201, description:"Assignment completed."})
  @ApiResponse({status:400, description:"Invalid request."})
  @ApiResponse({status:401, description:"Unauthorized."})
  async create(
    @Req() request:Request, 
    @Param('assignmentid') assignmentid: string, 
    @Body() createSubmissionDto: CreateSubmissionDto, 
    @UploadedFile() file:Express.Multer.File,
    @Param('id') id?: string, 
    ) {
      try {
        console.log(id)
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

  @Get(':assignmentid/submission')
  @UseGuards(TeacherGuard)
  
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Submissions fetched."})
  @ApiResponse({status:400, description:"Invalid request."})
  @ApiResponse({status:401, description:"Unauthorized."})
  findAll(@Param('assignmentid') assignmentid: string) {
    return this.submissionsService.findAll(assignmentid);
  }
  
  @Get('submission/:id')
  @UseGuards(UserGuard)
  
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Submission fetched."})
  @ApiResponse({status:400, description:"Not found."})
  @ApiResponse({status:401, description:"Unauthorized."})
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }
  
  @Patch('submission/:id')
  @UseGuards(TeacherGuard)
  @ApiBody({
    type:UpdateSubmissionDto
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Submission graded."})
  @ApiResponse({status:400, description:"Not found."})
  @ApiResponse({status:401, description:"Unauthorized."})
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }
  
  @Delete('submission/:id')
  @UseGuards(UserGuard)
  
  @ApiBearerAuth('access-token')
  @ApiResponse({status:200, description:"Submission deleted."})
  @ApiResponse({status:400, description:"Not found."})
  @ApiResponse({status:401, description:"Unauthorized."})
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
