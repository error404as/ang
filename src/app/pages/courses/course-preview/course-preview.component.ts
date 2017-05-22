import { Component, Input, Output, EventEmitter,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { CourseItem } from '../../../core/entities';

@Component({
	selector: 'course-preview',
	templateUrl: 'course-preview.component.html',
	styles: [require('./course-preview.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePreviewComponent implements OnInit, OnDestroy {
	public subscription: Subscription;
	public isLoggedin = false;
	@Input() public course: CourseItem;
	@Output() public deleteItem = new EventEmitter();
	@Output() public updateItem = new EventEmitter();

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store<any>
		) {
		this.subscription = this.store.select<any>('auth').subscribe((state) => {
			this.isLoggedin = state.logged;
			this.changeDetector.markForCheck();
		});

	}

	public updateCourse(course: CourseItem) {
		this.updateItem.emit({ data: course });
	}

	public deleteCourse(id: number) {
		this.deleteItem.emit({ courseId: id });
	}

	public ngOnInit() {

	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
