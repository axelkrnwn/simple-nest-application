"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
let FileUploadService = class FileUploadService {
    create(createFileUploadDto) {
        return 'This action adds a new fileUpload';
    }
    findAll() {
        return `This action returns all fileUpload`;
    }
    findOne(id) {
        return `This action returns a #${id} fileUpload`;
    }
    update(id, updateFileUploadDto) {
        return `This action updates a #${id} fileUpload`;
    }
    remove(id) {
        return `This action removes a #${id} fileUpload`;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map