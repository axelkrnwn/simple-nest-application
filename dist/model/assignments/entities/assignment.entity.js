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
exports.Assignment = void 0;
const courses_entity_1 = require("../../courses/entities/courses.entity");
const submission_entity_1 = require("../../submissions/entities/submission.entity");
const typeorm_1 = require("typeorm");
let Assignment = class Assignment {
    id;
    title;
    description;
    attachment;
    deadline;
    course;
    submissions;
};
exports.Assignment = Assignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Assignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Assignment.prototype, "attachment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Assignment.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => courses_entity_1.Course, course => course.assignments, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", courses_entity_1.Course)
], Assignment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => submission_entity_1.Submission, submission => submission.assignment, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Assignment.prototype, "submissions", void 0);
exports.Assignment = Assignment = __decorate([
    (0, typeorm_1.Entity)({ name: "assignments" })
], Assignment);
//# sourceMappingURL=assignment.entity.js.map