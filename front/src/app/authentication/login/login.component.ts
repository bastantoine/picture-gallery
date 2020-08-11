import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';

import { User } from "../../models";
import { AuthService, isLoggedIn } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(isLoggedIn()) {
      this.router.navigate(['/home'])
    }
    this.user = new User('', '');
  }

  login() {
    this.authService.getTokens(this.user)
      .pipe(first())
      .subscribe(
        () => this.router.navigate(['/home']),
        () => this.router.navigate(['/login'])
      );
  }

}
