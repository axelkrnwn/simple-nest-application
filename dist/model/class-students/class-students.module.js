"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassStudentsModule = void 0;
const common_1 = require("@nestjs/common");
const class_students_service_1 = require("./class-students.service");
const class_students_controller_1 = require("./class-students.controller");
const class_student_entity_1 = require("./entities/class-student.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ClassStudentsModule = class ClassStudentsModule {
};
exports.ClassStudentsModule = ClassStudentsModule;
exports.ClassStudentsModule = ClassStudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([class_student_entity_1.ClassStudent])],
        controllers: [class_students_controller_1.ClassStudentsController],
        providers: [class_students_service_1.ClassStudentsService],
    })
], ClassStudentsModule);
//# sourceMappingURL=class-students.module.js.map