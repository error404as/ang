import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'course-preview',
	templateUrl: 'course.component.html',
	styles: [require('./course.component.scss')],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public course = {};
	@Output() public deleteItem = new EventEmitter();

	constructor() {
	}

	public deleteCourse(id) {
		this.deleteItem.emit({ courseId: id });
	}

}
