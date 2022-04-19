import { Module } from "@nestjs/common";
import { FileSystemStoredFile, NestjsFormDataModule } from "nestjs-form-data";
import { BulletinModule } from "src/modules/bulletin/bulletin.module";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
    imports: [
        BulletinModule,
        NestjsFormDataModule.config({
            storage: FileSystemStoredFile,
            autoDeleteFile: false
        }),
    ],
    controllers: [HomeController],
    providers: [HomeService]
})
export class HomeModule { }