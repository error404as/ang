import { Component, Input, Output, EventEmitter,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from '../../../core/services';
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

	private count = 0;

	constructor(private loginService: LoginService, private changeDetector: ChangeDetectorRef) {
	}

	public updateCourse(course: CourseItem) {
		course.name += ' ' + this.count;
		this.count++;
		this.updateItem.emit({ data: course });
	}

	public deleteCourse(id: number) {
		this.deleteItem.emit({ courseId: id });
	}

	public ngOnInit() {
		this.subscription = this.loginService.authed$.subscribe((isAuth) => {
			this.isLoggedin = isAuth;
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
