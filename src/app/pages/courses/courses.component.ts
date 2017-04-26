import {
	Component, ViewEncapsulation, NgZone,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CoursesService, ModalService, LoginService, LoadingService } from '../../core/services';
import { CourseItem, CourseItem2 } from '../../core/entities';
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
	public courseItems: CourseItem2[] = [];
	public isLoggedin = false;
	public currPage = 0;
	public hasNext = true;
	private timer = null;
	private currentFilter: string = '';

	constructor(
		private coursesService: CoursesService,
		private filterNames: FilterByNamePipe,
		private modal: ModalService,
		private loginService: LoginService,
		private loading: LoadingService,
		private changeDetector: ChangeDetectorRef,
		private ngZone: NgZone
	) {
		this.loading.open();

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
			}
		});
	}

	public updateCourse($event) {
		alert('Nope!');
		// this.coursesService.updateCourse($event.data);
	}

	public filterByNameField($event?: {q: string}) {
		if ($event) {
			this.currentFilter = $event.q;
			this.loading.open();
			this.coursesService.getFilteredByName($event.q);
		}
		/*
		this.courseItems = this.filterNames.transform(
			this.courseItems,
			this.currentFilter
		);
		*/
	}

	public getPrev() {
		this.loading.open();
		this.coursesService.getPrev(this.currentFilter);
	}

	public getNext() {
		this.loading.open();
		this.coursesService.getNext(this.currentFilter);
	}

	public ngOnInit() {
		console.log('Page courses init');
		this.coursesObserver = this.coursesService.courses$.subscribe((courses) => {
			this.loading.close();
			console.log(courses);
			if (courses.items.length) {
				this.currPage = courses.page;
				this.hasNext = true;
				this.courseItems = courses.items;
			} else {
				this.hasNext = false;

				if (courses.page === 0) {
					this.currPage = courses.page;
					this.courseItems = courses.items;
				}
			}
			this.changeDetector.markForCheck();
		});

		/*
		this.coursesObserver = this.coursesService.getFromServer(0, 10).subscribe((courses) => {
			this.courseItems = courses;
			this.changeDetector.markForCheck();
		});
		*/
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
