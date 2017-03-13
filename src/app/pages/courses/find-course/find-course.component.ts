import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'find-course',
	templateUrl: 'find-course.component.html',
	encapsulation: ViewEncapsulation.None
})
export class FindCourseComponent {
	//@Input() public todo: TodoItem;

	constructor() {
	}

	public filterCourses(val) {
		console.log(val);
	}
}
