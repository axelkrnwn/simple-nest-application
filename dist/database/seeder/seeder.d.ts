import { Logger } from "@nestjs/common";
import { User } from "src/model/users/entities/users.entity";
import { Repository } from "typeorm";
export declare class Seeder {
    private repository;
    private readonly logger;
    constructor(repository: Repository<User>, logger: Logger);
    seed(): Promise<void>;
}
