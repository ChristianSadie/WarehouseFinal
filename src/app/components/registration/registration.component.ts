//Imported from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Imported service
import { FirebaseService } from 'src/app/shared/firebase.service';

//Registration details interface
export interface RegistrationDetails {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  id: string;
  token: string;
  lastLogin: Date;
  // tokenExpiry?: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  //Initialising variable types
  registrationDetails: RegistrationDetails;
  confirmEmail = '';
  confirmPassword = '';
  username:'' 

  constructor(public firebase : FirebaseService, public route : Router) { }

  /**
   * Method on initialising registration page
   */
  ngOnInit(): void {
    
    //Initialising variable values (empty)
    this.registrationDetails = {
      email: '',
      name: '',
      surname: '',
      id: '',
      password: '',
      role: '',
      token: '',
      lastLogin: null,
    }
  }

  /**
   * Method that returns the position of the last space in the surname, used for surname validation
   */
  findSpace(){
    for (let i = this.registrationDetails.surname.length-1; i >= 0; i--){
      if (this.registrationDetails.surname[i] === " ") {
        return i;
      }
    }
    return -1;
  }

  /**
   * Method on submission of registration details
   */
  onSubmit() {

    //Validation: name
    if (this.registrationDetails.name[0] !== this.registrationDetails.name[0].toUpperCase()) {
      alert("Capitalise the first letter of your name");
      return;
    }

    var index = this.findSpace();
  
    //Validation: surname
    if (this.registrationDetails.surname[index+1] !== this.registrationDetails.surname[index+1].toUpperCase()) {
      alert("Capitalise your surname properly ");
      return;
    }

    //Validation: email
    if (this.registrationDetails.email !== this.confirmEmail) {
      alert("Emails do not match");
      return;
    }

    //Validation: password
    if (this.registrationDetails.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //Validation: id
    if (this.registrationDetails.id.length !== 13) {
      alert("ID not valid");
      return;
    }

    //Adds user to Firebase and redirects to home page
    const request = this.firebase.createUser(this.username, this.registrationDetails);
    request.subscribe((response : RegistrationDetails) => {
      if (response.id === this.registrationDetails.id){
        this.route.navigate(['/home']);
      }
    });
    
  }

}
