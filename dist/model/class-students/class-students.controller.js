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
exports.ClassStudentsController = void 0;
const common_1 = require("@nestjs/common");
const class_students_service_1 = require("./class-students.service");
const create_class_student_dto_1 = require("./dto/create-class-student.dto");
const update_class_student_dto_1 = require("./dto/update-class-student.dto");
const users_guard_1 = require("../users/users.guard");
const teacher_guard_1 = require("../users/teacher.guard");
let ClassStudentsController = class ClassStudentsController {
    classStudentsService;
    constructor(classStudentsService) {
        this.classStudentsService = classStudentsService;
    }
    async create(request, createClassStudentDto) {
        const user = await request['user'];
        return this.classStudentsService.create(user.id, createClassStudentDto);
    }
    async findByUser(request) {
        const user = await request['user'];
        return this.classStudentsService.findByUser(user.id);
    }
    async findByCourse(id) {
        return this.classStudentsService.findByCourse(id);
    }
    update(id, updateClassStudentDto) {
        return this.classStudentsService.update(id, updateClassStudentDto);
    }
    async leave(request, id) {
        const user = await request['user'];
        return this.classStudentsService.remove(user.id, id);
    }
};
exports.ClassStudentsController = ClassStudentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_class_student_dto_1.CreateClassStudentDto]),
    __metadata("design:returntype", Promise)
], ClassStudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassStudentsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('/course/:id'),
    (0, common_1.UseGuards)(teacher_guard_1.TeacherGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassStudentsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_class_student_dto_1.UpdateClassStudentDto]),
    __metadata("design:returntype", void 0)
], ClassStudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClassStudentsController.prototype, "leave", null);
exports.ClassStudentsController = ClassStudentsController = __decorate([
    (0, common_1.Controller)('class-students'),
    __metadata("design:paramtypes", [class_students_service_1.ClassStudentsService])
], ClassStudentsController);
//# sourceMappingURL=class-students.controller.js.map