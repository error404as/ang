import { Component } from '@angular/core';

@Component({
	selector: 'find-course',
	templateUrl: 'find-course.component.html'
})
export class FindCourseComponent {
	public filterValue = '';

	constructor() {
	}

	public filterCourses() {
		console.log('Search for:', this.filterValue);
	}
}
