import { User } from "src/model/users/entities/users.entity";
import { Repository } from "typeorm";
export declare class Seeder {
    private repository;
    constructor(repository: Repository<User>);
    seed(): Promise<void>;
}
