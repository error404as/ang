import {
	Component, ViewEncapsulation, NgZone,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';

import { CoursesService, ModalService } from '../../core/services';
import { CourseItem } from '../../core/entities';
import { FilterByNamePipe } from '../../core/pipes';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [FilterByNamePipe],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
	public courseItems: CourseItem[];
	private timer = null;

	constructor(
		private coursesService: CoursesService,
		private filterNames: FilterByNamePipe,
		private modal: ModalService,
		private changeDetector: ChangeDetectorRef,
		private ngZone: NgZone
	) {

		// ngZone shows nothing here..
		this.ngZone.onUnstable.subscribe(() => {
			this.timer = performance.now();
		});
		this.ngZone.onUnstable.subscribe(() => {
			console.log('stable time: ' + (performance.now() - this.timer));
		});

		console.log('Page courses constructor');
	}

	public deleteCourse($event) {
		this.modal.open({
			title: 'Confirm',
			msg: 'Do you really want to delete this course?',
			submit: () => {
				this.coursesService.deleteCourse($event.courseId);
				this.courseItems = this.coursesService.getCourses();
				this.changeDetector.markForCheck();
			}
		});
	}

	public updateCourse($event) {
		this.coursesService.updateCourse($event.data);
		this.courseItems = this.coursesService.getCourses();
	}

	public filterByNameField($event) {
		this.courseItems = this.filterNames.transform(this.coursesService.getCourses(), $event.q);
	}

	public ngOnInit() {
		console.log('Page courses init');
		this.courseItems = this.coursesService.getCourses();
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
