import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/services';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./login.styles.scss')],
	template: require('./login.template.html')
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(private loginService: LoginService, private router: Router) {
		console.log('Page Login constructor');
		if (loginService.isAuthenticated()) {
			this.router.navigateByUrl('/');
		}
	}

	public setUser(user: string, password: string) {
		let result = this.loginService.logIn(user, password);
		if (result) {
			this.router.navigateByUrl('/');
		}
	}

	public ngOnInit() {
		console.log('Page login');
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
