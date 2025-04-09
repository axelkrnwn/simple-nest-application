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
exports.CourseDetail = void 0;
const courses_entity_1 = require("../../courses/entities/courses.entity");
const typeorm_1 = require("typeorm");
let CourseDetail = class CourseDetail {
    id;
    title;
    description;
    attachment;
    createdDate;
    course;
};
exports.CourseDetail = CourseDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CourseDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseDetail.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseDetail.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CourseDetail.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => courses_entity_1.Course, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", courses_entity_1.Course)
], CourseDetail.prototype, "course", void 0);
exports.CourseDetail = CourseDetail = __decorate([
    (0, typeorm_1.Entity)({ name: "course-details" })
], CourseDetail);
//# sourceMappingURL=course-detail.entity.js.map