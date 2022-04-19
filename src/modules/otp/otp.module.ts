import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "../mail/mail.module";
import { UserModule } from "../user/user.module";
import { OtpRepository } from "./otp.repository";
import { OtpService } from "./otp.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([OtpRepository]),
        MailModule,
        UserModule
    ],
    providers: [OtpService],
    exports: [OtpService]
})
export class OtpModule {}