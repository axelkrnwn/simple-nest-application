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
exports.ClassStudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_student_entity_1 = require("./entities/class-student.entity");
const typeorm_2 = require("typeorm");
let ClassStudentsService = class ClassStudentsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(user, dto) {
        console.log(dto);
        if (user.role != "student") {
            throw new common_1.UnauthorizedException();
        }
        const enroll = await this.find(user.id, dto.courseId);
        if (enroll != null) {
            throw new common_1.UnauthorizedException();
        }
        if (dto.courseId == "") {
            throw new Error("Course invalid");
        }
        const data = this.repo.create({ studentId: user.id, ...dto, enrollmentDate: new Date() });
        return await this.repo.save(data);
    }
    async find(userId, courseId) {
        return await this.repo.findOne({ where: { studentId: userId, courseId: courseId } });
    }
    async findByUser(user) {
        if (user.role == 'admin') {
            return await this.repo.find({ relations: {
                    course: {
                        teacher: true,
                        assignments: {
                            submissions: true
                        }
                    }
                } });
        }
        return await this.repo.find({ where: { studentId: user.id }, relations: {
                course: {
                    teacher: true,
                    assignments: true
                }
            } });
    }
    async findByCourse(courseId) {
        return await this.repo.find({ where: { courseId: courseId }, relations: ['student'], select: { student: true } });
    }
    async update(id, dto) {
        if (id == "") {
            throw new common_1.UnauthorizedException();
        }
        if (!dto.courseId) {
            throw new Error("Course invalid");
        }
        let updated = await this.repo.findOne({ where: { studentId: id, courseId: dto.courseId } });
        if (!updated) {
            throw new Error("Course not found");
        }
        updated.courseId = dto.courseId;
        return await this.repo.save(updated);
    }
    async remove(userId, courseId) {
        return await this.repo.delete({ courseId: courseId, studentId: userId });
    }
};
exports.ClassStudentsService = ClassStudentsService;
exports.ClassStudentsService = ClassStudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(class_student_entity_1.ClassStudent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassStudentsService);
//# sourceMappingURL=class-students.service.js.map