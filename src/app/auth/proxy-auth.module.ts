/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
 import { AuthRoutingModule } from './proxy-auth-routing.module';
 import { NbAuthModule } from '@nebular/auth';
 import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
 
import { LoginComponent } from './login/login.component';
import { ProxyAuthStrategy } from './strategy/proxy-strategy';
import { ProxyAuthStrategyOptions } from './strategy/proxy-strategy-options';
 
 
 @NgModule({
   imports: [
     CommonModule,
     FormsModule,
     NbAlertModule,
     NbInputModule,
     NbButtonModule,
     NbCheckboxModule,
     AuthRoutingModule,
     NbAuthModule,
   ],
   providers: [
    ProxyAuthStrategy,
    ProxyAuthStrategyOptions, 
   ],
   declarations: [
    LoginComponent,
   ],
 })
 export class ProxyAuthModule {
 }
 