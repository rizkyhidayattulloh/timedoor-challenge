import { OmitType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";
import { UpdateBulletinDto } from "src/modules/bulletin/dto/update-bulletin.dto";

export class HomeUpdateDto extends OmitType(UpdateBulletinDto, ['image']) {
    @IsOptional()
    @IsFile()
    @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'])
    image?: FileSystemStoredFile | string;

    deleteImage?: any;
}