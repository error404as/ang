import {
	Component, ViewEncapsulation,
	ChangeDetectionStrategy,
	OnInit, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import {
	FormControl, FormGroup, FormArray,
	FormBuilder, Validators
} from '@angular/forms';

import { CoursesService, LoadingService, ModalService } from '../../core/services';
import { CourseItem2 } from '../../core/entities';

@Component({
	selector: 'course-edit',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./course-edit.styles.scss')],
	template: require('./course-edit.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {
	public name: string = '';
	public description: string = '';
	public date: string = '';
	public duration: number;
	public formEdit: FormGroup;
	public formErrors;
	public authorsList = [
		{ id: 1, name: 'Smith' },
		{ id: 2, name: 'Johnson' },
		{ id: 3, name: 'Williams' },
		{ id: 4, name: 'Brown' },
		{ id: 5, name: 'Miller' }
	];

	constructor(
		private router: Router,
		private loading: LoadingService,
		private coursesService: CoursesService,
		private modal: ModalService,
		private formBuilder: FormBuilder
	) { }

	public submitCourse(form) {
		this.getErrors();

		let course: CourseItem2 = {
			id: 0,
			name: form.value.title,
			length: form.value.duration * 1 || 0,
			date: form.value.date || new Date(),
			isTopRated: false,
			description: form.value.description
		};
		console.log('Saving Course');
		console.log(course);
		this.loading.open();
		this.coursesService.createCourse(course).then((id) => {
			this.loading.close();
			this.router.navigateByUrl('');
		});

	}

	public cancel() {
		console.log('Cancel Course');
		this.router.navigateByUrl('');
	}

	public ngOnInit() {
		console.log('Page Edit Course');

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
			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', [Validators.required, Validators.maxLength(500)]],
			date: [new Date(), Validators.required],
			duration: [null, Validators.pattern('\\d+')],
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
		// unsubscribe here
	}
}
