"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users.entity");
const hash_1 = require("../../util/hash");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
let UsersService = class UsersService {
    cacheManager;
    userRepository;
    jwtService;
    constructor(cacheManager, userRepository, jwtService) {
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async createUser(dto) {
        if (dto.role != "teacher" && dto.role != "student") {
            throw new Error("Invalid role!");
        }
        if (dto.username.length < 5 || dto.username.length > 20) {
            throw new Error("Username must be 5-20 characters!");
        }
        console.log('here 2');
        if (!dto.email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$")) {
            throw new Error("Email pattern invalid!");
        }
        console.log('here 3');
        if (!dto.password.match("^[a-zA-Z0-9]+$")) {
            throw new Error("Password must be alphanumeric!");
        }
        console.log('here');
        const newUser = this.userRepository.create({ ...dto, password: await hash_1.Hasher.hash(dto.password) });
        this.cacheManager.clear();
        return await this.userRepository.save(newUser);
    }
    async login(dto) {
        this.cacheManager.clear();
        const users = await this.userRepository.findOne({ where: { email: dto.email } });
        if (!users) {
            throw new Error("User not found");
        }
        const verify = await hash_1.Hasher.verify(dto.password, users.password);
        if (!verify) {
            throw new Error("Password incorrect");
        }
        console.log(users.id);
        const payload = { id: users.id, role: users.role, username: users.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async getAllUser() {
        let value = await this.cacheManager.get('user');
        if (!value) {
            value = await this.userRepository.find();
            await this.cacheManager.set('user', value);
        }
        return value;
    }
    async getUser(userId) {
        console.log(userId);
        let value = await this.cacheManager.get('user:' + userId);
        if (!value) {
            value = await this.userRepository.findOneBy({ id: userId });
            await this.cacheManager.set('user:' + userId, value);
        }
        return value;
    }
    async remove(id) {
        this.cacheManager.clear();
        return await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [cache_manager_1.Cache, typeorm_2.Repository, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map