import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { LoginDTO } from './dtos/login.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("./entities/users.entity").User[]>;
    addUser(createUserDTO: CreateUserDTO): Promise<void>;
    login(loginDTO: LoginDTO): Promise<{
        access_token: string;
    }>;
    me(request: Request): any;
}
