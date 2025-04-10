"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./model/users/users.module");
const courses_module_1 = require("./model/courses/courses.module");
const database_module_1 = require("./providers/database/database.module");
const course_details_module_1 = require("./model/course-details/course-details.module");
const assignments_module_1 = require("./model/assignments/assignments.module");
const submissions_module_1 = require("./model/submissions/submissions.module");
const class_students_module_1 = require("./model/class-students/class-students.module");
const seeder_module_1 = require("./database/seeder/seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule, users_module_1.UserModule, assignments_module_1.AssignmentsModule, courses_module_1.CoursesModule, course_details_module_1.CourseDetailsModule, submissions_module_1.SubmissionsModule, class_students_module_1.ClassStudentsModule, seeder_module_1.SeederModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map