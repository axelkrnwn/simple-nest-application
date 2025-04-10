import { Injectable, Logger } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/users/entities/users.entity";
import { Hasher } from "src/util/hash";
import { Repository } from "typeorm";

@Injectable()
export class Seeder {
  
    constructor(@InjectRepository(User) private repository: Repository<User>, private readonly logger: Logger){}

    async seed() {
        const user = this.repository.create({
            "username":"admin",
            "email":process.env.ADMIN_EMAIL,
            "password": await Hasher.hash(process.env.ADMIN_PASSWORD ?? ""),
            "role":"admin",
            "address":"-"
        })
        await this.repository.save(user).then(() => this.logger.debug('Seeding success')).catch(error => this.logger.error(error.message))
    }
}