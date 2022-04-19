import { Module } from "@nestjs/common";
import { AuthModule as Auth } from "src/modules/auth/auth.module";
import { OtpModule } from "src/modules/otp/otp.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [Auth, OtpModule],
    controllers: [AuthController]
})
export class AuthModule {}