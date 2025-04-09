"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const course_details_service_1 = require("./course-details.service");
const course_details_controller_1 = require("./course-details.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_detail_entity_1 = require("./entities/course-detail.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let CourseDetailsModule = class CourseDetailsModule {
};
exports.CourseDetailsModule = CourseDetailsModule;
exports.CourseDetailsModule = CourseDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([course_detail_entity_1.CourseDetail]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/course-details',
                    filename: (req, file, cb) => {
                        console.log(req.body);
                        const filename = `${Date.now()}-${req.body['title']}-${file.originalname}`;
                        cb(null, filename);
                    },
                }),
            }),
        ],
        controllers: [course_details_controller_1.CourseDetailsController],
        providers: [course_details_service_1.CourseDetailsService],
    })
], CourseDetailsModule);
//# sourceMappingURL=course-details.module.js.map