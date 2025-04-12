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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const add_course_dto_1 = require("./dtos/add-course.dto");
const platform_express_1 = require("@nestjs/platform-express");
const users_guard_1 = require("../users/users.guard");
const swagger_1 = require("@nestjs/swagger");
const teacher_guard_1 = require("../users/teacher.guard");
let CoursesController = class CoursesController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async addCourse(request, dto, image) {
        const user = await request['user'];
        try {
            await this.courseService.addCourse(user, dto, image);
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
    async getCourses() {
        return await this.courseService.getAllCourse();
    }
    async getCourseByTeacher(request) {
        const user = await request['user'];
        console.log('here');
        console.log(user);
        let course = await this.courseService.getCourseByTeacher(user.id);
        return course;
    }
    async getCourse(params) {
        let course = await this.courseService.getCourse(params.id);
        return course;
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                image: {
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
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_course_dto_1.AddCourseDTO, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "All course has successfully fetched." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Course has successfully fetched." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized." }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseByTeacher", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Course has successfully fetched." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Course not found." }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourse", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map