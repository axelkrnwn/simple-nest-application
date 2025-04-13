import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<unknown>;
    addUser(createUserDTO: CreateUserDTO): Promise<import("./entities/users.entity").User>;
    login(loginDTO: LoginDTO): Promise<{
        access_token: string;
    }>;
    me(request: Request): Promise<unknown>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
