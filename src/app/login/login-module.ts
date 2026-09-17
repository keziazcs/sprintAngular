import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Login } from './login/login';
import { LoginRoutingModule } from './login-routing-module';

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }