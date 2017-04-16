// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './courses.routes';

// custom components
import { CoursesComponent } from './courses.component';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { FindCourseComponent } from './find-course/find-course.component';

import { ViewBasedOnDateDirective } from '../../core/directives';
import { FormatMinutesPipe, OrderByPipe, FilterByNamePipe } from '../../core/pipes';

@NgModule({
	declarations: [
		CoursesComponent,
		CoursePreviewComponent,
		FindCourseComponent,
		ViewBasedOnDateDirective,
		FormatMinutesPipe,
		OrderByPipe,
		FilterByNamePipe
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: [],
	exports: [FormatMinutesPipe]
})
export class CoursesModule {
	constructor() {
	}
}
