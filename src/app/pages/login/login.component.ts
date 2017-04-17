import {
	Component, ViewEncapsulation,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoginService, LoadingService } from '../../core/services';

@Component({
	selector: 'login',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./login.styles.scss')],
	template: require('./login.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
	public subscription: Subscription;

	constructor(
		private loginService: LoginService,
		private router: Router,
		private loading: LoadingService,
		private changeDetector: ChangeDetectorRef
		) {
		console.log('Page Login constructor');
		if (loginService.isAuthenticated()) {
			this.router.navigateByUrl('/');
		}
	}

	public login(user: string, password: string) {
		this.loading.open();
		this.loginService.logInServer(user, password).subscribe((res) => {
			console.log(res);
			this.loading.close();
			this.router.navigateByUrl('/');
		}, (err) => {
			console.log(err);
			alert('Sorry, dear user. Please try again.');
			this.loading.close();
		});
	}

	public ngOnInit() {
		console.log('Page login');
		this.subscription = this.loginService.authed$.subscribe((isAuth) => {
			this.loading.close();
			if (isAuth) {
				this.router.navigateByUrl('/');
			}
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
