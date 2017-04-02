import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'find-course',
	templateUrl: 'find-course.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindCourseComponent {
	public filterValue = '';

	constructor() {
	}

	public filterCourses() {
		console.log('Search for:', this.filterValue);
	}
}
