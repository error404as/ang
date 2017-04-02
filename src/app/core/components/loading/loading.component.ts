import {
	Component, ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoadingService } from '../../services';

@Component({
	selector: 'loading',
	templateUrl: './loading.component.html',
	styles: [require('./loading.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit, OnDestroy {
	public visible = false;
	private subscription: Subscription;

	constructor(private loadingService: LoadingService, private changeDetector: ChangeDetectorRef) {
	}

	public ngOnInit() {
		this.subscription = this.loadingService.active$.subscribe((active) => {
			this.visible = active;
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
