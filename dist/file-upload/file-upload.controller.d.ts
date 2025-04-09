import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    create(createFileUploadDto: CreateFileUploadDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFileUploadDto: UpdateFileUploadDto): string;
    remove(id: string): string;
}
