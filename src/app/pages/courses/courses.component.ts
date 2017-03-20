import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { CoursesService } from '../../core/services';
import { CourseItem } from '../../core/entities';

@Component({
	selector: 'courses-list',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./courses.styles.scss')],
	template: require('./courses.template.html')
})
export class CoursesComponent implements OnInit, OnDestroy {

	public courseItems = [];

	constructor(private coursesService: CoursesService) {
		console.log('Page courses constructor');
	}

	public deleteCourse($event) {
		if (confirm('Do you really want to delete this course?')) {
			// Burn in hell, Angular 2 !!!
			this.coursesService.deleteCourse($event.courseId);
			this.courseItems = this.coursesService.getCourses();
		}
	}

	public ngOnInit() {
		console.log('Page courses init');
		this.courseItems = this.coursesService.getCourses();
	}

	public ngOnDestroy() {
		// unsubscribe here
	}
}
