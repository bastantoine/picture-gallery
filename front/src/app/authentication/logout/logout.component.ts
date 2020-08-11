import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { isLoggedIn, logout } from "../../services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(isLoggedIn()) {
      logout();
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
