/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent, NbAuthService,NbAuthResult, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'nb-login',
  template: '<div></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  // user inherited
  // strategy inherited

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options: {},
    protected authService: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
  ) {
    super(authService, options, cd, router);
    
  }

  ngOnInit(){
    this.login()
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        return this.router.navigateByUrl(redirect);
      }
      this.cd.detectChanges();
    });
  }

  oauth2Login(){
    this.router.navigateByUrl('/oauth2');
  }

}
