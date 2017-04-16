// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoursesModule } from '../courses/courses.module';

import { CourseEditComponent } from './course-edit.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { DurationFieldComponent } from './duration-field/duration-field.component';

@NgModule({
	declarations: [
		CourseEditComponent,
		DateFieldComponent,
		DurationFieldComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		CoursesModule // pipe for minutes
	],
	providers: []
})
export class CourseEditModule {
	constructor() {
	}
}
