import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  //Relevant information about a user
  username: string;
  token: string;
  name: string;
  email: string;
  role: string;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() { }

/**
 * Method to handle users logging in, puts user data into stored variables
 * @param userNameIn is username of user
 * @param tokenIn is user's unique token
 * @param nameIn is user's name
 * @param emailIn is email of user
 * @param roleIn is role of user (admin/cashier)
 */
  onLogin (userNameIn, tokenIn, nameIn, emailIn, roleIn: string) {
    this.username = userNameIn;
    this.token = tokenIn;
    this.name = nameIn;
    this.email = emailIn;
    this.role = roleIn;
    this.loggedIn = true;
    this.isAdmin = (this.role === 'admin');
    this.isLoggedIn$.next(true);
  }

/**
 * Method to handle users logging out, clears stored variables
 */
  onLogOut () {
    this.username = '';
    this.token = '';
    this.isLoggedIn$.next(false);
    this.loggedIn = false;
  } 

}