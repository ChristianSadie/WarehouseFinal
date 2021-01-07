//Imported from Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Imported services
import { FirebaseService } from './shared/firebase.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'warehouse';

  constructor(private fireBase: FirebaseService, private userInfo: UserService, private route: Router) { this.autoLogin(); }

  /**
   * Method to keep the current user logged in when navigating to different pages or refreshing, using the token stored.
   */
  autoLogin() {
    const token = window.localStorage.token;
    const request = this.fireBase.getAllUsers();
    
    request.subscribe(response => {

      Object.keys(response).forEach(entry => {
        const user = response[entry]; 
        
        if (token === user.token) {
          this.userInfo.onLogin(user.username, user.token, user.name, user.email, user.role);
          this.route.navigate(['/profile']);
        };

      })

    });

  }

}
