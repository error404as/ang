import {
	Component, ViewEncapsulation,
	ChangeDetectionStrategy,
	OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

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
	public name: string = '';
	public description: string = '';
	public date: string = '';
	public duration: number;

	constructor(
		private router: Router,
		private loading: LoadingService,
		private coursesService: CoursesService,
		private modal: ModalService
		) { }

	public submitCourse(force?: boolean) {
		if (!force) {
			let errorMessage: string[] = [];
			if (!this.name.trim()) {
				alert('Course title is required');
				return false;
			}
			if (!this.date) {
				errorMessage.push('Course <b>start date</b> is not defined.');
			}
			if (!this.duration) {
				errorMessage.push('Course <b>duration</b> is not defined.');
			}
			if (errorMessage.length) {
				this.modal.open({
					title: 'Please confirm your data',
					msg: errorMessage.join('<br>') + '<hr>You\'ll be able to edit this data later.',
					submit: () => {
						this.submitCourse(true);
					}
				});
				return false;
			}
		}

		let course: CourseItem = {
			id: 0,
			name: this.name || '',
			duration: this.duration || 0,
			date: this.date ? new Date(this.date) : new Date(),
			topRated: false,
			description: this.description || ''
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

	public setDate($event) {
		this.date = $event.value;
	}

	public setDuration($event) {
		this.duration = $event.value;
	}

	public ngOnInit() {
		console.log('Page Edit Course');

	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
