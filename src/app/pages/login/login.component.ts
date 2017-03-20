import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { LoginService } from '../../core/services';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./login.styles.scss')],
	template: require('./login.template.html')
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(private loginService: LoginService) {
		console.log('Page Login constructor');
	}

	public setUser(user: string) {
		this.loginService.logIn(user);
	}

	public ngOnInit() {
		console.log('Page login');
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
