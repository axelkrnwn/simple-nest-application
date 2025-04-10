import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/users/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class Seeder {
  
    constructor(@InjectRepository(User) private repository: Repository<User>){}

    async seed() {
        const user = this.repository.create({
            "username":"admin",
            "email":process.env.ADMIN_EMAIL,
            "password":process.env.ADMIN_PASSWORD,
            "role":"admin",
            "address":"-"
        })
        await this.repository.save(user)
    }
}