import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { LocalSerializer } from "./serializer/local.serializer";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        UserModule, 
        PassportModule.register({
            session: true
        })
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
    exports: [AuthService]
})
export class AuthModule { }