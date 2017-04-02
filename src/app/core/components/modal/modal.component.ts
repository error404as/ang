import {
	Component, ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../services';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styles: [require('./modal.component.scss')],
	changeDetection: ChangeDetectionStrategy.Default
})
export class ModalComponent implements OnInit, OnDestroy {
	public visible = false;
	public title: string;
	public message: string;

	private subscription: Subscription;

	constructor(private modalService: ModalService, private changeDetector: ChangeDetectorRef) {

	}

	public open() {
		this.title = this.modalService.title;
		this.message = this.modalService.msg;
	}
	public close() {
		this.modalService.active.next(false);
	}
	public submit() {
		this.modalService.submit();
	}

	public ngOnInit() {
		this.subscription = this.modalService.active$.subscribe((active) => {
			this.visible = active;
			if (active) {
				this.open();
			}
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
