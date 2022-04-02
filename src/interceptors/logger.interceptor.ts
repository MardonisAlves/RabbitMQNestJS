import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        console.log('Antes...')
        const now = Date.now();

        return next
            .handle().
            pipe(
                tap(() => console.log(`Depois... ${Date.now() - now}ms`))
                )
    }

}