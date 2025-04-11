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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const courses_entity_1 = require("./entities/courses.entity");
let CoursesService = class CoursesService {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async addCourse(teacher, dto, image) {
        console.log(image);
        if (dto.title.length < 5 || dto.title.length > 50) {
            throw new common_1.BadRequestException('title must be 5-50 characters');
        }
        if (dto.description.length < 5 || dto.description.length > 100) {
            throw new common_1.BadRequestException('description must be 5-100 characters');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedMimeTypes.includes(image.mimetype)) {
            throw new common_1.BadRequestException('invalid file type');
        }
        const maxSize = 5 * 1024 * 1024;
        if (image.size > maxSize) {
            throw new common_1.BadRequestException('file is too large!');
        }
        const newCourse = this.courseRepository.create({ ...dto, image: image.path, teacher: teacher });
        console.log('Saving course:', newCourse);
        return await this.courseRepository.save(newCourse);
    }
    async getAllCourse() {
        return await this.courseRepository.find({ relations: ['teacher'] });
    }
    async getCourse(id) {
        return await this.courseRepository.findOne({ relations: ['courseDetails', 'assignments', 'teacher'], where: { id: id } });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(courses_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map