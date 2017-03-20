import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {

    public authed = new BehaviorSubject<boolean>(false);
    public authed$ = this.authed.asObservable();
    private user: string = '';

	constructor() {
	}

    public logIn (name: string) {
        console.log('LoginService: ' + name);
        this.user = name;
        this.authed.next(true);
    }

    public logOut () {
        console.log('LoginService: logout');
        this.user = '';
        this.authed.next(false);
    }

    public getUserInfo () {
        return {name: this.user};
    }

    public isAuthenticated (): boolean {
        return !!this.user;
    }

}
