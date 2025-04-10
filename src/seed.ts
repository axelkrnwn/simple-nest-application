import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./database/seeder/seeder.module";
import { Seeder } from "./database/seeder/seeder";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
      .then(appContext => {
        const seeder = appContext.get(Seeder);
        const logger = appContext.get(Logger);
        seeder
          .seed()
          .then(() => {
            logger.debug('Seeding complete!');
          })
          .catch(error => {
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch(error => {
        throw error;
      });
  }
  bootstrap();