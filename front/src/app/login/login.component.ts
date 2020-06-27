import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from "../models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  submitted = false;
  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = new User('', '');
  }

  login() {
    this.submitted = true;
    this.router.navigate(['/home']);
  }

}
