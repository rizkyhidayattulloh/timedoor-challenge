import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigModule } from "src/config/app-config.module";
import { DatabaseConfigService } from "src/config/services/database-config.service";
import { HomeModule } from "./home/home.module";
import * as csruf from 'csurf';
import { AuthModule } from "./auth/auth.module";
import { FileSystemStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { BullModule } from "@nestjs/bull";
import { QueueConfigService } from "src/config/services/queue-config.service";

const webModule = [
    HomeModule,
    AuthModule
]

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        }),
        TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [DatabaseConfigService],
            useFactory: (configService: DatabaseConfigService) => configService.mysqlConfig
        }),
        BullModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [QueueConfigService],
            useFactory: (configService: QueueConfigService) => configService.queueConfig
        }),
        ...webModule
    ]
})
export class WebModule {}