import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { CsrfInterceptor } from "src/interceptors/csrf.interceptor";

export function Csrf() {
    return applyDecorators(
        UseInterceptors(CsrfInterceptor)
    );
}