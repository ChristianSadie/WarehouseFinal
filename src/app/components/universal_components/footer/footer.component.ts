//Imported from Angular
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  
  constructor() { }

  date = new Date();

  /**
   * Method on initialisation of footer
   */
  ngOnInit() {
      setInterval(() => { this.date = new Date() }, 1000);
  }
  
}