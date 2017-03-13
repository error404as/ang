import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'find-course',
	templateUrl: 'find-course.component.html',
	encapsulation: ViewEncapsulation.None
})
export class FindCourseComponent {
	public filterValue: string = '';

	constructor() {
	}

	public filterCourses() {
		console.log('Search for:', this.filterValue);
	}
}
