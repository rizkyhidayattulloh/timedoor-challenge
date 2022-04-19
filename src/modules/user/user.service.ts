import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { hash } from 'src/common/helper';
import * as moment from "moment";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async store(body: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(body);

        user.password = await hash(body.password);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException();
        }

        return user;
    }

    async getByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    async getById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async verifyEmail(user: User): Promise<void> {
        user.isEmailVerified = moment().format('YYYY-MM-DD HH:mm:ss');

        await this.userRepository.update(user.id, user);
    }
}