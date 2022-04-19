import { MailerModule } from "@nestjs-modules/mailer";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AppConfigModule } from "src/config/app-config.module";
import { MailConfigService } from "src/config/services/mail-config.service";
import { MailProcessor } from "./mail.processor";
import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [MailConfigService],
            useFactory: (configService: MailConfigService) => configService.mailConfig
        }),
        BullModule.registerQueue({ name: 'mail' })
    ],
    providers: [MailService, MailProcessor],
    exports: [MailService]
})
export class MailModule { }