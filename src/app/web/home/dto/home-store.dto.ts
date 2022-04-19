import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsOptional } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';
import { CreateBulletinDto } from 'src/modules/bulletin/dto/create-bulletin.dto';
import { User } from 'src/modules/user/user.entity';

export class HomeStoreDto extends OmitType(CreateBulletinDto, ['image']) {
    @IsOptional()
    @IsFile({})
    @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'])
    image?: FileSystemStoredFile | string;

    user?: User;
}