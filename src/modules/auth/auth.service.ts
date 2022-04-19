import { BadRequestException, Injectable } from "@nestjs/common";
import { compare } from "src/common/helper";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    async register(body: CreateUserDto): Promise<User> {
        return this.userService.store(body);
    }

    async login(login: LoginDto) {
        const { email, password } = login;

        const user = await this.userService.getByEmail(email);

        if (!user) throw new BadRequestException({message: ['email or password wrong']});
    }

    async getAuthenticatedUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email);

        if (!user) throw new BadRequestException({message: ['email or password wrong']});

        if (!user.isEmailVerified) throw new BadRequestException({message: ['email not verified']})

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new BadRequestException({message: ['email or password wrong']});

        return user;
    }
}