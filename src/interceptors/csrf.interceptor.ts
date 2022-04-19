import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { concat, concatAll, concatWith, endWith, map, Observable, tap } from "rxjs";

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(map(data => {
            data.csrfToken = request.csrfToken();

            return data;
        }));
    }
}