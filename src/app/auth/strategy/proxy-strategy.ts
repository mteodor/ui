import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbAuthStrategy, NbAuthResult, NbAuthStrategyClass, NbAuthIllegalTokenError } from '@nebular/auth';
import { ProxyAuthStrategyOptions, proxyStrategyOptions } from './proxy-strategy-options';
import { delay, map, catchError } from 'rxjs/operators';

/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: NbAuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
@Injectable()
export class ProxyAuthStrategy extends NbAuthStrategy {

  constructor(protected http: HttpClient,
    protected route: ActivatedRoute) {
    super();
  }

  protected defaultOptions: ProxyAuthStrategyOptions = proxyStrategyOptions;

  static setup(options: ProxyAuthStrategyOptions): [NbAuthStrategyClass, ProxyAuthStrategyOptions] {
    return [ProxyAuthStrategy, options];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'login';
    const method = this.getOption(`${module}.method`);
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);
    return this.http.request(method, url, {body: data, observe: 'response'})
      .pipe(
        map((res) => {
          return res;
        }),
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            [],
            this.createToken(this.getOption('token.getter')(module, res, this.options), requireValidToken));
        }),
        catchError((res) => {
          return this.handleResponseError(res, module);
        }),
      );
  }

  protected handleResponseError(res: any, module: string): Observable<NbAuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      errors = this.getOption('errors.getter')(module, res, this.options);
    } else if (res instanceof NbAuthIllegalTokenError) {
      errors.push(res.message)
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(
      new NbAuthResult(
        false,
        res,
        this.getOption(`${module}.redirect.failure`),
        errors,
      ));
  }
 
  register(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  logout(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  protected createDummyResult(data?: any): NbAuthResult {

    if (this.getOption('alwaysFail')) {
      return new NbAuthResult(
        false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.'],
      );
    }

    try {
      const token = this.createToken('test token', true);
      return new NbAuthResult(
        true,
        this.createSuccessResponse(data),
        '/',
        [],
        ['Successfully logged in.'],
        token,
      );
    } catch (err) {
      return new NbAuthResult(
        false,
        this.createFailResponse(data),
        null,
        [err.message],
      );
    }
  }


}
