import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMailPageRoutingModule } from './login-mail-routing.module';

import { LoginMailPage } from './login-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginMailPageRoutingModule
  ],
  declarations: [LoginMailPage]
})
export class LoginMailPageModule {}
