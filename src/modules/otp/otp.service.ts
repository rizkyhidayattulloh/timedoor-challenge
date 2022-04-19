import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "../mail/mail.service";
import { User } from "../user/user.entity";
import { OtpMail } from "./mail/otp.mail";
import { OtpRepository } from "./otp.repository";
import * as moment from 'moment';
import { MoreThanOrEqual } from "typeorm";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OtpRepository)
        private repository: OtpRepository,
        private mailService: MailService,
        private userService: UserService,
        private configService: ConfigService
    ) { }

    async request(user: User): Promise<void> {
        const token = await this.repository.generateToken();
        const url   = this.configService.get('APP_URL') + `/email-verify?token=${token}`;
        const otp = this.repository.create({ token, user })

        otp.expiredAt = moment().add(5, 'm').format('YYYY-MM-DD HH:mm:ss');

        try {
            await this.repository.save(otp);

            await this.mailService.to(user.email).send(new OtpMail(url));
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException();
        }
    }

    async verify(token: string): Promise<void> {
        try {
            const now = moment().format('YYYY-MM-DD HH:mm:ss');
            const otp = await this.repository.findOneOrFail({
                where: { 
                    token, 
                    expiredAt: MoreThanOrEqual(now),
                    verifiedAt: null
                },
                relations: ['user']
            });

            await this.userService.verifyEmail(otp.user);

            otp.verifiedAt = now;

            await this.repository.update(otp.id, otp);
        } catch (error) {
            throw new BadRequestException({ message: ['invalid token'] });
        }
    }
}