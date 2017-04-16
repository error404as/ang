import { Injectable } from '@angular/core';
import {
     CanActivate,
     Router,
     ActivatedRouteSnapshot,
     RouterStateSnapshot
} from '@angular/router';

import { LoginService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
     constructor(private authService: LoginService, private router: Router) { }

     public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          if (this.authService.isAuthenticated()) {
               return true;
          } else {
               this.router.navigateByUrl('/login');
               return false;
          }
     }
}
