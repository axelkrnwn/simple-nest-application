"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassStudentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_class_student_dto_1 = require("./create-class-student.dto");
class UpdateClassStudentDto extends (0, mapped_types_1.PartialType)(create_class_student_dto_1.CreateClassStudentDto) {
}
exports.UpdateClassStudentDto = UpdateClassStudentDto;
//# sourceMappingURL=update-class-student.dto.js.map