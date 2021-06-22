/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions,  NbAuthSimpleToken, NbAuthTokenClass} from '@nebular/auth';
import {  HttpResponse } from '@angular/common/http';
import { getDeepFromObject} from '@nebular/auth';

export interface ProxyStrategyModule {
  alwaysFail?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  requireValidToken?: boolean;
  defaultErrors?: string[];
  defaultMessages?: string[];

  
}


export interface PasswordStrategyToken {
  class?: NbAuthTokenClass,
  key?: 'token',
  getter?: Function,
}



export class ProxyAuthStrategyOptions extends NbAuthStrategyOptions {
  baseEndpoint? = '/api/';
  login?: boolean | ProxyStrategyModule = {
    alwaysFail: false,
    endpoint: 'tokens',
    method: 'get',
    requireValidToken: false,
    redirect: {
      success: 'pages/home',
      failure: null,
    },
    defaultErrors: [''],
    defaultMessages: ['You have been successfully logged in.'],
  };

  token?: PasswordStrategyToken = {
    class: NbAuthSimpleToken,
    key: 'token',
    getter: (module: string, res: HttpResponse<Object>, options: ProxyAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.token.key,
    ),
  };
  delay?: number = 1000;
  alwaysFail?: boolean = false;
}



export const proxyStrategyOptions: ProxyAuthStrategyOptions = new ProxyAuthStrategyOptions();
