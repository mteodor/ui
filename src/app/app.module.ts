/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbAuthModule, NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTToken } from '@nebular/auth';
import { ApiJWTInterceptor} from './auth/token.interceptor.service'
import { AuthGuard } from './auth-guard.service';

import { MqttModule, IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { environment } from '../environments/environment';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: false,
  url: environment.mqttWsUrl,
};


import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
  NbCardModule,
  NbIconModule,
  NbButtonModule,
} from '@nebular/theme';

// MFx- Foorm dependency
import { FormsModule } from '@angular/forms';
// Mfx - Auth and Profile pages
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProxyAuthStrategy } from './auth/strategy/proxy-strategy';
@NgModule({
  declarations: [
    AppComponent,
    // Mfx Componennt
    LogoutComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbAuthModule.forRoot({
      strategies: [
        ProxyAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken ,
            key: 'token',
          },
        }),
      ],


    }),
    
    // Mfx dependencies
    CoreModule.forRoot(),
    FormsModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
  ],
  bootstrap: [AppComponent],
  // Mfx dependencies
  providers: [
    AuthGuard,
    ProxyAuthStrategy,
    { provide: HTTP_INTERCEPTORS, useClass: ApiJWTInterceptor, multi: true},
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; }, },
  ],
})
export class AppModule {
}
