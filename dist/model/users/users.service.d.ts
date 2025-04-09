import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/createUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    createUser(dto: CreateUserDTO): Promise<User>;
    login(dto: LoginDTO): Promise<{
        access_token: string;
    }>;
    getAllUser(): Promise<User[]>;
}
