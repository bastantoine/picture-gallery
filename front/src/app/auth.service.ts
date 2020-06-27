import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { endpoint } from "./api-config";
import { join } from "./utils";
import { ApiService } from "./api.service";
import { User } from "./models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenApi = join(endpoint, 'api', 'token/');
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
  }

  getTokens(user: User): Observable<boolean> {
    return this.api.post<TokenResult>(this.tokenApi, user)
      .pipe(map(
        (tokens) => {
          let status = false;
          if(tokens !== undefined) {
            status = true;
            localStorage.setItem('access', tokens.access);
            localStorage.setItem('refresh', tokens.refresh);
          }
          this.isLoggedInSubject.next(status);
          return status
        }
      ));
  }

  isLoggedIn(): boolean {
    return (localStorage.getItem('access') !== null);
  }

  getAccessToken(): string {
    if(this.isLoggedIn()) {
      return localStorage.getItem('access');
    }
    return '';
  }

}

interface TokenResult {
  access: string;
  refresh: string;
}
