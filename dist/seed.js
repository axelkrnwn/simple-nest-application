"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const seeder_module_1 = require("./database/seeder/seeder.module");
const seeder_1 = require("./database/seeder/seeder");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule)
        .then(appContext => {
        const seeder = appContext.get(seeder_1.Seeder);
        const logger = appContext.get(common_1.Logger);
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
//# sourceMappingURL=seed.js.map