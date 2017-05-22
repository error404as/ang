import {
	Component, ViewEncapsulation,
	ChangeDetectionStrategy, ChangeDetectorRef,
	OnInit, OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {
	FormControl, FormGroup, FormArray,
	FormBuilder, Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { CoursesService, LoadingService, ModalService } from '../../core/services';
import { CourseItem } from '../../core/entities';

@Component({
	selector: 'course-edit',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./course-edit.styles.scss')],
	template: require('./course-edit.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {
	public formEdit: FormGroup;
	public formErrors;
	public authorsList = [
		{ id: 1, name: 'Smith' },
		{ id: 2, name: 'Johnson' },
		{ id: 3, name: 'Williams' },
		{ id: 4, name: 'Brown' },
		{ id: 5, name: 'Miller' }
	];
	public courseObserver: Subscription;
	public course: CourseItem = {
        id: 0, name: '', length: 0, date: new Date(), isTopRated: false, description: ''
    };
	public courseID: number;

	constructor(
		private router: Router,
		private loading: LoadingService,
		private coursesService: CoursesService,
		private modal: ModalService,
		private formBuilder: FormBuilder,
		private changeDetector: ChangeDetectorRef,
		private activated: ActivatedRoute,
		private store: Store<any>
	) { }

	public submitCourse(form) {
		this.getErrors();

		let course: CourseItem = {
			id: this.courseID || 0,
			name: form.value.title,
			length: form.value.duration * 1 || 0,
			date: form.value.date || new Date(),
			isTopRated: false,
			description: form.value.description
		};
		console.log('Saving Course');
		console.log(course);
		this.loading.open();
		if (this.courseID) {
			this.coursesService.updateCourse(course).then((id) => {
				this.loading.close();
				this.router.navigateByUrl('');
			});
		} else {
			this.coursesService.createCourse(course).then((id) => {
				this.loading.close();
				this.router.navigateByUrl('');
			});
		}

	}

	public cancel() {
		console.log('Cancel Course');
		this.router.navigateByUrl('');
	}

	public ngOnInit() {
		console.log('Page Edit Course');

		this.courseID = this.activated.snapshot.params['id'] * 1;
		if (this.courseID) {
			this.courseObserver = this.store.select<any>('course').subscribe((course) => {
				this.course = course;
				this.init();
				this.changeDetector.markForCheck();
			});
			this.coursesService.getById( this.courseID );
		} else {
			this.init();
		}
	}

	public init() {
		let authors = this.formBuilder.array(
			this.authorsList.map((author) => this.formBuilder.group({
				[author.name]: false
			}))
		);
		let authors2 = this.formBuilder.group({});
		this.authorsList.forEach((author) => {
			authors2.addControl('author.' + author.name, new FormControl(false));
		});
		this.formEdit = this.formBuilder.group({
			title: [this.course.name, [Validators.required, Validators.maxLength(50)]],
			description: [this.course.description, [Validators.required, Validators.maxLength(500)]],
			date: [this.course.date, Validators.required],
			duration: [this.course.length, Validators.pattern('\\d+')],
			authorsList: authors2
		});
		this.formEdit.valueChanges.subscribe((data) => {
			this.getErrors();
		});

		this.getErrors();
	}

	public getErrors() {
		let errors = [];
		errors = [];
		for (let el in this.formEdit.controls) {
			if (this.formEdit.controls[el] instanceof FormControl && this.formEdit.controls[el].errors) {
				errors.push({ [el]: this.formEdit.controls[el].errors });
			}
		}
		this.formErrors = errors;
		return errors.length ? true : false;
	}

	public ngOnDestroy() {
		if (typeof this.courseObserver !== 'undefined') {
			this.courseObserver.unsubscribe();
		}
	}
}
