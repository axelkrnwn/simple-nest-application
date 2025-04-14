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
const submission_entity_1 = require("../submissions/entities/submission.entity");
let AssignmentsService = class AssignmentsService {
    assignmentRepository;
    submissionRepository;
    constructor(assignmentRepository, submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
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
    async update(id, updateAssignmentDto, file) {
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error("course's post not found!");
        }
        if (updateAssignmentDto.title && (updateAssignmentDto.title.length < 5 || updateAssignmentDto.title.length > 50)) {
            throw new common_1.BadRequestException('title must be 5-50 characters');
        }
        if (updateAssignmentDto.description && (updateAssignmentDto.description.length < 5 || updateAssignmentDto.description.length > 100)) {
            throw new common_1.BadRequestException('description must be 5-100 characters');
        }
        if (updateAssignmentDto.deadline && (new Date(updateAssignmentDto.deadline).getTime() < new Date().getTime())) {
            throw new common_1.BadRequestException('deadline must not before now');
        }
        const maxSize = 100 * 1024 * 1024;
        if (file &&
            file.size > maxSize) {
            throw new common_1.BadRequestException('file is too large!');
        }
        if (file) {
            updated.attachment = file.path;
        }
        const data = this.assignmentRepository.merge(updated, updateAssignmentDto);
        return await this.assignmentRepository.save(data);
    }
    async remove(id) {
        const submission = await this.submissionRepository.findBy({ score: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()), assignment: { id: id } });
        console.log(submission);
        if (submission.length > 0) {
            throw new common_1.BadRequestException('Assignment cant be deleted! already has a graded submission');
        }
        return await this.assignmentRepository.delete(id);
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map