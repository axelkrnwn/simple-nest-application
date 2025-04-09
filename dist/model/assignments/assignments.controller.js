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
const users_guard_1 = require("../users/users.guard");
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
    update(id, updateAssignmentDto) {
        return this.assignmentsService.update(id, updateAssignmentDto);
    }
    remove(id) {
        return this.assignmentsService.remove(id);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, common_1.Post)("/assignment/:courseid"),
    (0, common_1.UseGuards)(users_guard_1.UserGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Param)('courseid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_assignment_dto_1.CreateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/assignment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/assignment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assignment_dto_1.UpdateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/assignment/:id'),
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