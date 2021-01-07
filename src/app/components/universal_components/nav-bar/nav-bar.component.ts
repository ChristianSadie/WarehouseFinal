//Imported from Angular
import { Component, OnInit } from '@angular/core';

//Imported service
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  isLoggedIn: boolean;
  displayName: string;
  roleAdmin: boolean;

  constructor(private userState: UserService) { }

  /**
   * Method on initialisation of nav-bar
   */
  ngOnInit(): void {

    this.userState.isLoggedIn$.subscribe( (isLoggedIn: boolean) => {
      
      this.isLoggedIn = isLoggedIn;
      this.displayName = '';

      if (this.isLoggedIn) {
        this.displayName = this.userState.name;
        this.roleAdmin = this.userState.isAdmin;
      }

      window.localStorage.name = this.displayName;
      window.localStorage.email = this.userState.email;

    });

  }

  /**
   * Method for handling user log out and clearing storage of token
   */
  logout() {
    this.userState.onLogOut();
    window.localStorage.username ='';
    window.localStorage.email ='';
    window.localStorage.token ='';
    this.roleAdmin = false;
  }

}
