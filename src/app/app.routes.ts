import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { CourseEditComponent } from './pages/course-edit';
import { LoginComponent } from './pages/login';
import { NoContentComponent } from './pages/no-content';

import { AuthGuard } from './core/guards';

export const ROUTES: Routes = [
	{path: '', component: CoursesComponent},
	{path: 'add-course', component: CourseEditComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: '**', component: NoContentComponent},
];
