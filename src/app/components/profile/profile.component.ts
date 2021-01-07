//Imported from Angular
import { Component, OnInit } from '@angular/core';

//Imported services
import { FirebaseService } from 'src/app/shared/firebase.service';
import { UserService } from 'src/app/shared/user.service';

//Editable details interface
export interface editedDetails {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  //Initialising variable types
  edits: editedDetails;
  currentName: string;
  currentEmail: string;
  userName: string;

  constructor(private user: UserService, public firebase: FirebaseService) { }

  ngOnInit(): void {

    //Initialising variable values (local storage)
    this.currentName = window.localStorage.name;
    this.currentEmail = window.localStorage.email;

    //Initialising variable values (empty)
    this.edits = {
      name: '',
      email: '',
    };

    this.userName = this.user.username;

  }

  /**
   * Method for handling user editing details
   */
  onEdit() {

    //Validation: name
    if (this.edits.name === ''){
      this.edits.name = this.currentName;
    } else {
      if (this.edits.name[0] !== this.edits.name[0].toUpperCase()) {
        alert("Capitalise the first letter of your name");
        return;
      }
    }

    //Validation: email
    if (this.edits.email === ''){
      this.edits.email = this.currentEmail;
    }
    
    //Updating the user information on Firebase
    const request = this.firebase.updateUser(this.userName, this.edits);
    request.subscribe();

  }
  
}


