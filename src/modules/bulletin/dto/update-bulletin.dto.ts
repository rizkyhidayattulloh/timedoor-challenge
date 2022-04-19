import {IsNotEmpty} from 'class-validator';

export class UpdateBulletinDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    image?: any;
}