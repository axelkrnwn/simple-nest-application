"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../model/users/entities/users.entity");
const class_student_entity_1 = require("../../model/class-students/entities/class-student.entity");
const courses_entity_1 = require("../../model/courses/entities/courses.entity");
const assignment_entity_1 = require("../../model/assignments/entities/assignment.entity");
const submission_entity_1 = require("../../model/submissions/entities/submission.entity");
const course_detail_entity_1 = require("../../model/course-details/entities/course-detail.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT ?? "3306"),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                connectTimeout: 60 * 60 * 1000,
                entities: [users_entity_1.User, class_student_entity_1.ClassStudent, courses_entity_1.Course, assignment_entity_1.Assignment, submission_entity_1.Submission, course_detail_entity_1.CourseDetail],
                synchronize: true,
            })]
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map