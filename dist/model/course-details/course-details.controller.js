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
exports.CourseDetailsController = void 0;
const common_1 = require("@nestjs/common");
const course_details_service_1 = require("./course-details.service");
const create_course_detail_dto_1 = require("./dto/create-course-detail.dto");
const update_course_detail_dto_1 = require("./dto/update-course-detail.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const teacher_guard_1 = require("../users/teacher.guard");
let CourseDetailsController = class CourseDetailsController {
    courseDetailsService;
    constructor(courseDetailsService) {
        this.courseDetailsService = courseDetailsService;
    }
    async create(courseid, createCourseDetailDto, file) {
        return await this.courseDetailsService.create(createCourseDetailDto, file, courseid);
    }
    findOne(id) {
        return this.courseDetailsService.findOne(id);
    }
    update(id, updateCourseDetailDto) {
        return this.courseDetailsService.update(id, updateCourseDetailDto);
    }
    remove(id) {
        return this.courseDetailsService.remove(id);
    }
};
exports.CourseDetailsController = CourseDetailsController;
__decorate([
    (0, common_1.Post)("/detail/:courseid"),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
        description: "JSON Structure to create course object."
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Course has successfully created." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course validation not satisfied." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized user" }),
    __param(0, (0, common_1.Param)('courseid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_course_detail_dto_1.CreateCourseDetailDto, Object]),
    __metadata("design:returntype", Promise)
], CourseDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/detail/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Course has successfully fetehed." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/detail/:id'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiBody)({
        type: update_course_detail_dto_1.UpdateCourseDetailDto,
        description: "JSON Structure to create course object."
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Course has successfully updated." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course validation not satisfied." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized user" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_detail_dto_1.UpdateCourseDetailDto]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/detail/:id'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Course has successfully fetehed." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseDetailsController.prototype, "remove", null);
exports.CourseDetailsController = CourseDetailsController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_details_service_1.CourseDetailsService])
], CourseDetailsController);
//# sourceMappingURL=course-details.controller.js.map