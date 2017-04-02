import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CourseItem } from '../../../core/entities';

@Component({
	selector: 'course-preview',
	templateUrl: 'course-preview.component.html',
	styles: [require('./course-preview.component.scss')]
})
export class CoursePreviewComponent {
	@Input() public course: CourseItem;
	@Output() public deleteItem = new EventEmitter();
	@Output() public updateItem = new EventEmitter();

	private count = 0;

	constructor() {
	}

	public updateCourse(course: CourseItem) {
		course.name += ' ' + this.count;
		this.count++;
		this.updateItem.emit({ data: course });
	}

	public deleteCourse(id: number) {
		this.deleteItem.emit({ courseId: id });
	}

}
