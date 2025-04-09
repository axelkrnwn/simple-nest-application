import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Hasher } from 'src/util/hash';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>, private jwtService:JwtService){
    }

    async createUser(dto: CreateUserDTO){
        if (dto.role != "teacher" && dto.role != "student"){
            throw new Error("Invalid role!")
        }
        if (dto.username.length < 5 || dto.username.length > 20){
            throw new Error("Username must be 5-20 characters!")
        }
        if (!dto.email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$")){
            throw new Error("Email pattern invalid!")
        }
        if (!dto.password.match("^[a-zA-Z0-9]+$")){
            throw new Error("Password must be alphanumeric!")
        }
        const newUser = this.userRepository.create({...dto, password: await Hasher.hash(dto.password)})

        return await this.userRepository.save(newUser)
    }

    async login(dto: LoginDTO){
        const users = await this.userRepository.findOne({where:{email:dto.email}})
        if (!users){
            throw new Error("User not found")
        }
        const verify = await Hasher.verify(dto.password, users.password)
        if (!verify){
            throw new Error("Password incorrect")
        }
        const payload = {id:users.id, role:users.role, username:users.username}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    getAllUser(){
        return this.userRepository.find();
    }

}
