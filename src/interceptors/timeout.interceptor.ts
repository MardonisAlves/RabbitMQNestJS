import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, timeout } from "rxjs";

export class TimeoputInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
       return next.handle().pipe(timeout(10000))
    }
    
}