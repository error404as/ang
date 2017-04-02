import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { CoursesService, ModalService } from '../../core/services';
import { CourseItem } from '../../core/entities';

@Component({
	selector: 'courses',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {
	public courseItems: CourseItem[];

	constructor(private coursesService: CoursesService, private modal: ModalService) {
		console.log('Page courses constructor');
	}

	public deleteCourse($event) {
		this.modal.open({
			title: 'Confirm',
			msg: 'Do you really want to delete this course?',
			submit: () => {
				this.coursesService.deleteCourse($event.courseId);
				this.courseItems = this.coursesService.getCourses();
			}
		});
	}

	public updateCourse($event) {
		this.coursesService.updateCourse($event.data);
		this.courseItems = this.coursesService.getCourses();
	}

	public ngOnInit() {
		console.log('Page courses init');
		this.courseItems = this.coursesService.getCourses();
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
