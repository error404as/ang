import {
	Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { LoginService } from '../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
	public subscription: Subscription;
	public isLoggedin = false;
	public username = '';

	constructor(
		private loginService: LoginService,
		private changeDetector: ChangeDetectorRef,
		private store: Store<any>
		) {
		this.subscription = this.store.select<any>('auth').subscribe((state) => {
			this.isLoggedin = state.logged;
			this.username = state.name;
			this.changeDetector.markForCheck();
		});
	}

	public logOut() {
		this.loginService.logOut();
	}

	public ngOnInit() {

	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
