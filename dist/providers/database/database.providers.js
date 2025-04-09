"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const users_entity_1 = require("../../model/users/entities/users.entity");
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? "3306"),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                connectTimeout: 60 * 60 * 1000,
                database: process.env.DB_NAME,
                entities: [users_entity_1.User],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map