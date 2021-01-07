//Imported from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Imported from rxjs
import { switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

//Imported component
import { RegistrationDetails } from '../registration/registration.component';

//Imported services
import { FirebaseService } from 'src/app/shared/firebase.service';
import { UserService } from 'src/app/shared/user.service';

//Login details interface
export interface loginDetails {
  username: string;
  password: string;
  valid: boolean;
  token: string;
  lastLogin: Date;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //Initialising variable type
  logindetails: loginDetails;

  constructor(public firebase: FirebaseService, public route : Router, private userState: UserService) { }

  /**
   * Method on initialation of login page
   */
  ngOnInit(): void {
  
    //Initialising varibale values
    this.logindetails = {
      username: '',
      password: '',
      valid: false,
      token: '',
      lastLogin: null,
    }
    
  }
  
  /**
   * Method to handle on submission of login data
   */
  onSubmit() {
    
    const request$ = this.firebase.checkUsername(this.logindetails.username);

    request$
    .pipe(
      switchMap( (existingUser: RegistrationDetails) => {
        
        if (existingUser === null) {
          alert("User does not exist")
          return empty();
        }
  
        if (existingUser.password !== this.logindetails.password) {
          alert("Wrong Password");
          return empty();
        }

        existingUser.token = this.genToken();
        window.localStorage.token = existingUser.token; 
        existingUser.lastLogin = new Date();
        window.localStorage.username = this.logindetails.username;

        this.userState.onLogin(this.logindetails.username, existingUser.token, existingUser.name, existingUser.email, existingUser.role);
        this.route.navigate(['/profile']);     
        return this.firebase.updateUser(this.logindetails.username, existingUser);
      
      })).subscribe();

  }
 
  /**
  * Genration of random token for user
  */
  genToken() {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

  }

}