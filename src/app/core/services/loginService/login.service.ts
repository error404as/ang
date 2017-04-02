import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

    public authed = new BehaviorSubject<boolean>(false);
    public authed$ = this.authed.asObservable();
    private user: string;
    private password: string;

    constructor() {
        let cred = localStorage.getItem('login');
        if (cred && cred.indexOf('/') !== -1) {
            this.user = cred.split('/')[0];
            this.password = cred.split('/')[1];
            this.authed.next(true);
        }
    }

    public logIn(name: string, password: string): boolean {
        console.log(`LoginService: ${name}/${password}`);
        if (name && password) {
            localStorage.setItem('login', name + '/' + password);
            this.user = name;
            this.authed.next(true);
            return true;
        } else {
            return false;
        }
    }

    public logOut() {
        console.log('LoginService: logout');
        this.user = '';
        this.password = '';
        this.authed.next(false);
        localStorage.removeItem('login');
    }

    public getUserInfo() {
        return { name: this.user };
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }

}
