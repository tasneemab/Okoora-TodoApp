import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  /*
   * checks whether the user can navigate to the route
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  )
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // if user is not logged in then navigate to login route
    let isLoggedIn: boolean = (localStorage['user_id'] ? true : false);
    if (!isLoggedIn) { return true; }

    // if user is already logged in, deny navigation to login and navigate to default route
    this.router.navigate(['**'], { replaceUrl: true });
    return false
  }
}
