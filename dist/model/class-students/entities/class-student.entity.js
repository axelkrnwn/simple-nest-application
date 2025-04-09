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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassStudent = void 0;
const courses_entity_1 = require("../../courses/entities/courses.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const typeorm_1 = require("typeorm");
let ClassStudent = class ClassStudent {
    studentId;
    courseId;
    enrollmentDate;
    progress;
    student;
    course;
};
exports.ClassStudent = ClassStudent;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ClassStudent.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ClassStudent.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ClassStudent.prototype, "enrollmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ClassStudent.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.User)
], ClassStudent.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => courses_entity_1.Course),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", courses_entity_1.Course)
], ClassStudent.prototype, "course", void 0);
exports.ClassStudent = ClassStudent = __decorate([
    (0, typeorm_1.Entity)({ name: "class-students" })
], ClassStudent);
//# sourceMappingURL=class-student.entity.js.map