import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
} from '@angular/router';

/**
 * determine whether user is authenticated to access app routes.
 * redirect to login if user is not authinticated.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  // checks whether the user can navigate to the route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // check if the user is logged in, if not go to login screen
  checkLogin(): boolean {
    let isLoggedIn: boolean = (localStorage['user_id'] ? true : false);
    if (isLoggedIn) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['login'], { replaceUrl: true });
    return false;
  }
}
