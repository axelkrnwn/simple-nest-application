import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';
import { UserGuard } from './users.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){

    }

    @Get()
    @ApiResponse({ status: 200, description: 'The users has been successfully fetched.'})
    getUsers(){
        return this.userService.getAllUser()
    }

    @Post()
    @ApiBody({
        type: CreateUserDTO,
        description: 'Json structure to create user object',
     })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    async addUser(@Body() createUserDTO: CreateUserDTO){
        try{
            return await this.userService.createUser(createUserDTO)
        }catch(error){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    @Post('login')
    @ApiBody({
        type: LoginDTO,
        description: 'Json structure to login',
     })
    @ApiResponse({ status: 200, description: 'The user has been successfully login.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    async login(@Body() loginDTO: LoginDTO){
        try {
            const res = await this.userService.login(loginDTO)
            return res
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth('access-token')
    @Get('me')
    @ApiResponse({ status: 200, description: 'The user has been successfully fetched.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    @ApiResponse({ status: 401, description: 'Unauthorized user.'})
    async me(@Req() request: Request){
        const res = await request['user']
        
        const user = await this.userService.getUser(res.id)
        return user
    }
    
    @UseGuards(UserGuard)
    @ApiBearerAuth('access-token')
    @Delete(':id')
    @ApiResponse({ status: 201, description: 'The user has been successfully deleted.'})
    @ApiResponse({ status: 400, description: 'There is a validation that is not satisfied.'})
    remove(@Param('id') id: string) {
    return this.userService.remove(id);
    }


}
