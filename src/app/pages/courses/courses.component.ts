import {
	Component, ViewEncapsulation, NgZone,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { CoursesService, ModalService, LoginService, LoadingService } from '../../core/services';
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
	public coursesSubscription: Subscription;
	public authSubscription: Subscription;
	public courseItems: CourseItem[] = [];
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
		private ngZone: NgZone,
		private store: Store<any>
	) {
		this.loading.open();

		this.coursesSubscription = this.store.select<any>('courses').subscribe((state) => {
			this.loading.close();
			console.log(state);
			if (state.items.length) {
				this.currPage = state.page;
				this.hasNext = true;
				this.courseItems = state.items;
			} else {
				this.hasNext = false;

				if (state.page === 0) {
					this.currPage = state.page;
					this.courseItems = state.items;
				}
			}
			this.changeDetector.markForCheck();
		});

		this.authSubscription = this.store.select<any>('auth').subscribe((state) => {
			this.isLoggedin = state.logged;
			this.changeDetector.markForCheck();
		});

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
	}

	public ngOnDestroy() {
		this.authSubscription.unsubscribe();
		this.coursesSubscription.unsubscribe();
	}
}
