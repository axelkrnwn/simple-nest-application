import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';
import { UserGuard } from './users.guard';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){

    }

    @Get()
    getUsers(){
        return this.userService.getAllUser()
    }

    @Post()
    async addUser(@Body() createUserDTO: CreateUserDTO){
        try{
            await this.userService.createUser(createUserDTO)
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
    @Get('me')
    me(@Req() request: Request){
        return request['user']  
    }
}
