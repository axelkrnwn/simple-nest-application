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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const submission_entity_1 = require("./entities/submission.entity");
const typeorm_2 = require("@nestjs/typeorm");
const class_student_entity_1 = require("../class-students/entities/class-student.entity");
const assignment_entity_1 = require("../assignments/entities/assignment.entity");
let SubmissionsService = class SubmissionsService {
    submissionRepository;
    assignmentRepository;
    studentRepository;
    constructor(submissionRepository, assignmentRepository, studentRepository) {
        this.submissionRepository = submissionRepository;
        this.assignmentRepository = assignmentRepository;
        this.studentRepository = studentRepository;
    }
    async create(id, user, assignmentId, dto, file) {
        if (!file) {
            throw new common_1.BadRequestException('no file uploaded');
        }
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('file is too large!');
        }
        const asg = await this.assignmentRepository.findOne({ where: { id: assignmentId } });
        const currentDate = new Date();
        if (!asg)
            throw new common_1.BadRequestException("Assignment not found");
        if (asg.deadline.getTime() < currentDate.getTime()) {
            throw new common_1.BadRequestException("Deadline has been exceeded");
        }
        if (id) {
            console.log("should be not here");
            const updated = await this.findOne(id);
            if (!updated) {
                throw new Error("assignment not found!");
            }
            updated.file = file.path;
            return await this.submissionRepository.update(id, updated);
        }
        const newSubmission = this.submissionRepository.create({ ...dto, file: file.path, assignment: { id: assignmentId }, user: user });
        console.log("Saving submission " + newSubmission);
        return await this.submissionRepository.save(newSubmission);
    }
    async findAll(assignmentid) {
        return await this.submissionRepository.find({ where: { assignment: { id: assignmentid } }, relations: ['user', 'assignment'] });
    }
    async findOne(id) {
        return await this.submissionRepository.findOne({ where: { id: id }, relations: { assignment: { course: true }, user: true } });
    }
    async findByAssignmentUser(userId, assignmentId) {
        return await this.submissionRepository.findOne({ where: { user: { id: userId }, assignment: { id: assignmentId } } });
    }
    async update(id, updateSubmissionDto) {
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error("assignment not found!");
        }
        const data = this.submissionRepository.merge(updated, updateSubmissionDto);
        const track = await this.studentRepository.findOne({
            where: {
                studentId: updated.user.id,
                courseId: updated.assignment.course.id
            }
        });
        if (track) {
            track.progress += updateSubmissionDto.score;
            await this.studentRepository.save(track);
        }
        return await this.submissionRepository.save(data);
    }
    async remove(id) {
        return await this.submissionRepository.delete(id);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(submission_entity_1.Submission)),
    __param(1, (0, typeorm_2.InjectRepository)(assignment_entity_1.Assignment)),
    __param(2, (0, typeorm_2.InjectRepository)(class_student_entity_1.ClassStudent)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map