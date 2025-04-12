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
exports.AssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const assignments_service_1 = require("./assignments.service");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const update_assignment_dto_1 = require("./dto/update-assignment.dto");
const platform_express_1 = require("@nestjs/platform-express");
const teacher_guard_1 = require("../users/teacher.guard");
const swagger_1 = require("@nestjs/swagger");
let AssignmentsController = class AssignmentsController {
    assignmentsService;
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    create(courseid, createAssignmentDto, file) {
        return this.assignmentsService.create(courseid, createAssignmentDto, file);
    }
    findOne(id) {
        return this.assignmentsService.findOne(id);
    }
    update(id, updateAssignmentDto, file) {
        console.log(updateAssignmentDto);
        return this.assignmentsService.update(id, updateAssignmentDto, file);
    }
    remove(id) {
        return this.assignmentsService.remove(id);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, common_1.Post)("/assignment/:courseid"),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                deadline: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
        description: "JSON Structure to create assignment."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Assignment added." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid request." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('courseid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_assignment_dto_1.CreateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/assignment/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Assignment added." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/assignment/:id'),
    (0, swagger_1.ApiBody)({
        type: update_assignment_dto_1.UpdateAssignmentDto,
        description: "JSON structure to update assignment"
    }),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Assignment updated." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Invalid request." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assignment_dto_1.UpdateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/assignment/:id'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Assignment updated." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "remove", null);
exports.AssignmentsController = AssignmentsController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
//# sourceMappingURL=assignments.controller.js.map