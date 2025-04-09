import { DataSource, Repository } from 'typeorm';
import { User } from './entities/users.entity';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    getUserByEmail(email: string): Promise<User[]>;
}
