import { Module } from "@nestjs/common";
import { DatabaseConfigService } from "./services/database-config.service";
import { MailConfigService } from "./services/mail-config.service";
import { QueueConfigService } from "./services/queue-config.service";

const providers = [
    DatabaseConfigService,
    MailConfigService,
    QueueConfigService
]

@Module({
    providers,
    exports: [...providers]
})
export class AppConfigModule {}