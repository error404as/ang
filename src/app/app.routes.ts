import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { CourseComponent } from './pages/course';
import { CourseEditComponent } from './pages/course-edit';
import { LoginComponent } from './pages/login';
import { NoContentComponent } from './pages/no-content';

import { AuthGuard } from './core/guards';

export const ROUTES: Routes = [
	{path: '', component: CoursesComponent},
	{path: 'courses', component: CoursesComponent},
	{path: 'courses/new', component: CourseEditComponent, canActivate: [AuthGuard]},
	{path: 'courses/:id', component: CourseComponent},
	{path: 'courses/:id/edit', component: CourseEditComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: '**', component: NoContentComponent},
];
