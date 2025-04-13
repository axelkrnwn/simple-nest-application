import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Cache } from '@nestjs/cache-manager';
export declare class UsersService {
    private cacheManager;
    private userRepository;
    private jwtService;
    constructor(cacheManager: Cache, userRepository: Repository<User>, jwtService: JwtService);
    createUser(dto: CreateUserDTO): Promise<User>;
    login(dto: LoginDTO): Promise<{
        access_token: string;
    }>;
    getAllUser(): Promise<unknown>;
    getUser(userId: string): Promise<unknown>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
    restore(id: string): Promise<import("typeorm").UpdateResult>;
}
