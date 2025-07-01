import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Hasher } from 'src/util/hash';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Not, Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager:Cache,@InjectRepository(User) private userRepository:Repository<User>, private jwtService:JwtService){
    }

    async createUser(dto: CreateUserDTO){
        if (dto.role != "teacher" && dto.role != "student"){
            throw new Error("Invalid role!")
        }
        if (dto.username.length < 5 || dto.username.length > 20){
            throw new Error("Username must be 5-20 characters!")
        }
        console.log('here 2')
        if (!dto.email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$")){
            throw new Error("Email pattern invalid!")
        }
        console.log('here 3')
        if (!dto.password.match("^[a-zA-Z0-9_]+$")){
            throw new Error("Password must be alphanumeric!")
        }
        console.log('here')
        const newUser = this.userRepository.create({...dto, password: await Hasher.hash(dto.password)})

        this.cacheManager.clear()
        return await this.userRepository.save(newUser)
    }

    async login(dto: LoginDTO){
        this.cacheManager.clear()
        const users = await this.userRepository.findOne({where:{email:dto.email}})
        if (!users){
            throw new Error("User not found")
        }
        const verify = await Hasher.verify(dto.password, users.password)
        if (!verify){
            throw new Error("Password incorrect")
        }
        if (users.isDeleted){
            throw new Error("User cannot be used to login")
        }
        console.log(users.id)
        const payload = {id:users.id, role:users.role, username:users.username}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    async getAllUser(){
        let value = await this.cacheManager.get('user');
        if (!value){
            value = await this.userRepository.find({withDeleted: true, where:{role:Not('admin')}})
            await this.cacheManager.set('user', value);
        }
        return value;
    }
    
    async getUser(userId:string){
        console.log(userId)
         
        let value = await this.cacheManager.get('user:'+userId);
        if (!value){
            value = await this.userRepository.findOneBy({id:userId})
            await this.cacheManager.set('user:'+userId, value);
        }
        return value
    }

    async remove(id: string) {
        this.cacheManager.clear()
        return await this.userRepository.update(id,{isDeleted:true})
    }
    async restore(id: string) {
        this.cacheManager.clear()
        return await this.userRepository.update(id,{isDeleted:false})
    }

}
