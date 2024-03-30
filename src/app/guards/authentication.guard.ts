import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // or 'any' if you prefer to provide it in a different module
})

export class AuthenticationGuard {
  constructor(private appState: AppStateService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appState.authState.isAuthenticated ==true) {
      return true
    } else {
      this.router.navigateByUrl("/login")
      return false
    } 
  }
}
