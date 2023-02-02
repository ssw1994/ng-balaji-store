import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  get userId(): string {
    const userId = localStorage.getItem('userId');
    return userId ? userId : '';
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    alert();
    const req = request.clone({
      headers: request.headers.set('balaji_user_id', this.userId),
    });
    return next.handle(req);
  }
}
