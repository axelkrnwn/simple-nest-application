import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
export declare class FileUploadService {
    create(createFileUploadDto: CreateFileUploadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFileUploadDto: UpdateFileUploadDto): string;
    remove(id: number): string;
}
