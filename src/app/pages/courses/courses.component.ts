import {
	Component, ViewEncapsulation, NgZone,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CoursesService, ModalService, LoginService } from '../../core/services';
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
	public coursesObserver: Subscription;
	public authObserver: Subscription;
	public courseItems: CourseItem[];
	public isLoggedin = false;
	private timer = null;
	private currentFilter: string = '';

	constructor(
		private coursesService: CoursesService,
		private filterNames: FilterByNamePipe,
		private modal: ModalService,
		private loginService: LoginService,
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
				this.filterByNameField();
			}
		});
	}

	public updateCourse($event) {
		this.coursesService.updateCourse($event.data);
	}

	public filterByNameField($event?: {q: string}) {
		if ($event) {
			this.currentFilter = $event.q;
		}
		this.courseItems = this.filterNames.transform(
			this.coursesService.getCourses(),
			this.currentFilter
		);
	}

	public ngOnInit() {
		console.log('Page courses init');
		this.coursesObserver = this.coursesService.allCourses$.subscribe((courses) => {
			this.courseItems = courses;
			this.changeDetector.markForCheck();
		});
		this.authObserver = this.loginService.authed$.subscribe((isAuth) => {
			this.isLoggedin = isAuth;
			this.changeDetector.markForCheck();
		});
	}

	public ngOnDestroy() {
		this.coursesObserver.unsubscribe();
		this.authObserver.unsubscribe();
	}
}
