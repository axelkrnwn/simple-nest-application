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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const submissions_service_1 = require("./submissions.service");
const create_submission_dto_1 = require("./dto/create-submission.dto");
const update_submission_dto_1 = require("./dto/update-submission.dto");
const users_guard_1 = require("../users/users.guard");
const platform_express_1 = require("@nestjs/platform-express");
const teacher_guard_1 = require("../users/teacher.guard");
const swagger_1 = require("@nestjs/swagger");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    async create(request, assignmentid, createSubmissionDto, file, id) {
        try {
            console.log(id);
            const user = await request['user'];
            return this.submissionsService.create(id, user, assignmentid, createSubmissionDto, file);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    findAll(assignmentid) {
        return this.submissionsService.findAll(assignmentid);
    }
    findOne(id) {
        return this.submissionsService.findOne(id);
    }
    update(id, updateSubmissionDto) {
        return this.submissionsService.update(id, updateSubmissionDto);
    }
    remove(id) {
        return this.submissionsService.remove(id);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.Post)(':assignmentid/submission'),
    (0, common_1.Post)(':assignmentid/submission/:id'),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
        description: "JSON Structure to create course object."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Assignment completed." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid request." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('assignmentid')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __param(4, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, create_submission_dto_1.CreateSubmissionDto, Object, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':assignmentid/submission'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Submissions fetched." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid request." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('assignmentid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('submission/:id'),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Submission fetched." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not found." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('submission/:id'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBody)({
        type: update_submission_dto_1.UpdateSubmissionDto
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Submission graded." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not found." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_submission_dto_1.UpdateSubmissionDto]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('submission/:id'),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Submission deleted." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not found." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "remove", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map