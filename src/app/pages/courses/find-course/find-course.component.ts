import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'find-course',
	templateUrl: 'find-course.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindCourseComponent {
	@Output() public doFilter = new EventEmitter();
	public filterValue = '';

	constructor() {
	}

	public filterCourses() {
		console.log('Search for:', this.filterValue);
		this.doFilter.emit({ q: this.filterValue });
	}

}
