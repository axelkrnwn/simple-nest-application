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
let SubmissionsService = class SubmissionsService {
    assignmentRepository;
    constructor(assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }
    async create(id, user, assignmentId, dto, file) {
        if (!file) {
            throw new common_1.BadRequestException('no file uploaded');
        }
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('file is too large!');
        }
        if (id) {
            const updated = await this.findOne(id);
            if (!updated) {
                throw new Error("assignment not found!");
            }
            updated.file = file.path;
            return await this.assignmentRepository.update(id, updated);
        }
        const newSubmission = this.assignmentRepository.create({ ...dto, file: file.path, assignment: { id: assignmentId }, user: user });
        console.log(newSubmission);
        return await this.assignmentRepository.save(newSubmission);
    }
    async findAll(assignmentid) {
        return await this.assignmentRepository.findOne({ where: { assignment: { id: assignmentid } } });
    }
    async findOne(id) {
        return await this.assignmentRepository.findOne({ where: { id: id } });
    }
    async update(id, updateSubmissionDto) {
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error("assignment not found!");
        }
        const data = this.assignmentRepository.merge(updated, updateSubmissionDto);
        return await this.assignmentRepository.save(data);
    }
    async remove(id) {
        return await this.assignmentRepository.delete(id);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(submission_entity_1.Submission)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map