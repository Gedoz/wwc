import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { routes } from '../website/website-routing.module';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

    if (this._auth.isLoggedIn()) {
      return true;
    }
    else {
      return this._router.parseUrl('/admin/login');
    }

  }
}