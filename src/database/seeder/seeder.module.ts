import { Logger, Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/users/entities/users.entity';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
    imports: [DatabaseModule,TypeOrmModule.forFeature([User]),],
    providers: [Seeder, Logger],
  })
  export class SeederModule {}
