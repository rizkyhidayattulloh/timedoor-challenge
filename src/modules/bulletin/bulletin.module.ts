import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BulletinRepository } from "./bulletin.repository";
import { BulletinService } from "./bulletin.service";

@Module({
    imports: [TypeOrmModule.forFeature([BulletinRepository])],
    providers: [BulletinService],
    exports: [BulletinService]
})
export class BulletinModule {}