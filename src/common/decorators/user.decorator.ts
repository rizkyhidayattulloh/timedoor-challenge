import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { BulletinInterceptor } from "src/interceptors/bulletin.interceptors";
import { UserInterceptor } from "src/interceptors/user.interceptor";

export function User() {
    return applyDecorators(
        UseInterceptors(UserInterceptor),
        UseInterceptors(BulletinInterceptor)
    );
}