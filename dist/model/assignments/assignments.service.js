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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
const typeorm_2 = require("typeorm");
let AssignmentsService = class AssignmentsService {
    assignmentRepository;
    constructor(assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }
    async create(courseId, dto, file) {
        if (dto.title.length < 5 || dto.title.length > 50) {
            throw new common_1.BadRequestException('title must be 5-50 characters');
        }
        if (dto.description.length < 5 || dto.description.length > 100) {
            throw new common_1.BadRequestException('description must be 5-100 characters');
        }
        if (!file) {
            throw new common_1.BadRequestException('no file uploaded');
        }
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('file is too large!');
        }
        const newCourse = this.assignmentRepository.create({ ...dto, attachment: file.path, course: { id: courseId } });
        console.log('Saving course detail:', newCourse);
        return await this.assignmentRepository.save(newCourse);
    }
    async findOne(id) {
        return await this.assignmentRepository.findOne({ where: { id: id } });
    }
    async update(id, updateAssignmentDto) {
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error("course's post not found!");
        }
        const data = this.assignmentRepository.merge(updated, updateAssignmentDto);
        return await this.assignmentRepository.save(data);
    }
    async remove(id) {
        return await this.assignmentRepository.delete(id);
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map