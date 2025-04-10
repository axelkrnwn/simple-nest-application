import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { DatabaseModule } from 'src/providers/database/database.module';
import { UserModule } from 'src/model/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    providers: [Seeder],
  })
  export class SeederModule {}
