"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_course_detail_dto_1 = require("./create-course-detail.dto");
class UpdateCourseDetailDto extends (0, mapped_types_1.PartialType)(create_course_detail_dto_1.CreateCourseDetailDto) {
}
exports.UpdateCourseDetailDto = UpdateCourseDetailDto;
//# sourceMappingURL=update-course-detail.dto.js.map