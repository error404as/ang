import {
	Component, ViewEncapsulation,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { CoursesService } from '../../core/services';
import { CourseItem } from '../../core/entities';

@Component({
	selector: 'course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./course.styles.scss')],
	template: require('./course.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, OnDestroy {
	public courseObserver: Subscription;
	public courseItem: CourseItem;
	public courseID: number;

	constructor(
		private router: Router,
		private coursesService: CoursesService,
		private changeDetector: ChangeDetectorRef,
		private activated: ActivatedRoute,
		private store: Store<any>
	) { }

	public ngOnInit() {
		this.courseID = this.activated.snapshot.params['id'];
		this.courseObserver = this.store.select<any>('course').subscribe((course) => {
			this.courseItem = course;
			this.changeDetector.markForCheck();
		});
		this.coursesService.getById( this.courseID );
	}

	public ngOnDestroy() {
		this.courseObserver.unsubscribe();
	}
}
