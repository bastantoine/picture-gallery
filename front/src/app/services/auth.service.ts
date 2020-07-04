import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { User } from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenApi = 'token';
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    if(this.isLoggedIn) {
      this.refreshAccessToken();
    }
  }

  getTokens(user: User): Observable<boolean> {
    return this.api.post<TokenResult>([this.tokenApi, '/'], user)
      .pipe(map(
        (tokens) => {
          let status = false;
          if(tokens !== undefined) {
            status = true;
            localStorage.setItem(TokenNames.ACCESS, tokens.access);
            localStorage.setItem(TokenNames.REFRESH, tokens.refresh);
            this.startRefreshTokenTimer()
          }
          this.isLoggedInSubject.next(status);
          return status
        }
      ));
  }

  isLoggedIn(): boolean {
    return (localStorage.getItem(TokenNames.ACCESS) !== null);
  }

  getAccessToken(): string {
    if(this.isLoggedIn()) {
      return localStorage.getItem(TokenNames.ACCESS);
    }
    return '';
  }

  private refreshAccessToken(): void {
    if(localStorage.getItem(TokenNames.REFRESH) !== null) {
      this.api.post<TokenResult>([this.tokenApi, 'refresh/'], {'refresh': localStorage.getItem(TokenNames.REFRESH)})
        .subscribe(
          tokens => {
            localStorage.setItem(TokenNames.ACCESS, tokens.access);
            this.startRefreshTokenTimer()
          }
        )
    }
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(localStorage.getItem(TokenNames.ACCESS).split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshAccessToken(), timeout);
  }

}

interface TokenResult {
  access: string;
  refresh: string;
}

enum TokenNames {
  ACCESS = 'access',
  REFRESH = 'refresh'
}
