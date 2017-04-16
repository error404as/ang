import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }    from './login.component';

// Route Configuration
const loginRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'logout', redirectTo: '', pathMatch: 'full' }
];

export const routes = RouterModule.forChild(loginRoutes);
