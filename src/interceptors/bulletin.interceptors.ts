import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";

@Injectable()
export class BulletinInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();

        return next.handle().pipe(map(data => {
            data.bulletins.items.map((bulletin: any) => {
                bulletin.isOwned = request.user?.id == bulletin.user?.id;
            })

            return data;
        }));
    }
}