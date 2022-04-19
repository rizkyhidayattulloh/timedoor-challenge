import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { IsUnique } from "src/common/validation/is-unique";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsUnique, [User, 'email'])
    email: string;

    @IsNotEmpty()
    password: string;
}