import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { endpoint } from "./api-config";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add access token to the request if user is logged in and the request is made to the API
        const isLoggedIn = this.authService.isLoggedIn();
        const isApiUrl = request.url.startsWith(endpoint);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.authService.getAccessToken()}` }
            });
        }

        return next.handle(request);
    }
}