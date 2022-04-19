import { IsNotEmpty } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";
import { User } from "src/modules/user/user.entity";

export class CreateBulletinDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    password?: string;

    image?: any;

    user?: User;
}