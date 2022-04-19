import { IsNotEmpty } from "class-validator";

export class CheckPasswordDto {
    @IsNotEmpty()
    password: string;
}