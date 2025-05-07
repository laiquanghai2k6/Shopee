import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { catchError, map, Observable, throwError } from "rxjs";


@Injectable()
export class TransformInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data=>instanceToPlain(data),catchError(err=>throwError(()=>new BadRequestException()))
    ))
    }
}