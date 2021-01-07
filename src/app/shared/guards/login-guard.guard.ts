//Imported from Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//Imported service
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardGuard implements CanActivate {

  constructor( private user: UserService ){}
   
  /**
   * Guard method to check if user is logged in to allow access to specific pages
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.user.loggedIn;
  }

}
