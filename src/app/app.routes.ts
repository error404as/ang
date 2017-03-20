import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses';
import { LoginComponent } from './pages/login';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', component: CoursesComponent},
	{path: 'login', component: LoginComponent},
	{path: '**', component: NoContentComponent},
];
