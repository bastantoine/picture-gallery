import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule { }
