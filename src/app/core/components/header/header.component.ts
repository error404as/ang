import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from '../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
	public subscription: Subscription;
	public isLoggedin = false;
	public user = {name: ''};

	constructor(private loginService: LoginService) {

	}

	public logOut() {
		this.loginService.logOut();
	}

	public ngOnInit() {
		this.subscription = this.loginService.authed$.subscribe((isAuth) => {
			this.isLoggedin = isAuth;
			this.user = isAuth ? this.loginService.getUserInfo() : {name: ''};
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
