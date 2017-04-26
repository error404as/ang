import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { LoginService } from '../';

@Injectable()
export class AuthHeader {

    constructor(private loginService: LoginService) {

    }

    public setAuthHeader(): Headers {
        let headers: Headers = new Headers();

        headers.set('Authorization', this.loginService.token);

        return headers;
    }

}
