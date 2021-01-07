import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Chart } from 'node_modules/chart.js';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.scss']
})

export class AdminChartComponent implements OnInit {

  roleAdmin: boolean;
  numOfMed: number;
  numOfClothes: number;
  numOfFood: number;
  numOfHouse: number;

  constructor(private user: UserService, public firebase: FirebaseService) { }

  ngOnInit(): void {
 //get the product service after moving this code
    this.numOfMed = 0;
    this.numOfClothes = 0;
    this.numOfFood = 0;
    this.numOfHouse = 0;

    const request = this.firebase.getAllProducts();
    
    request.subscribe(response => {

      Object.keys(response).forEach(entry => {
        const product = response[entry];
        if (product.category === 'medicine') {
          this.numOfMed += product.quantity;
        }
        if (product.category === 'clothes') {
          this.numOfClothes += product.quantity;
        }
        if (product.category === 'food') {
          this.numOfFood += product.quantity;
        }
        if (product.category === 'household') {
          this.numOfHouse += product.quantity;
        }
      }) // move this to the product service
     
      var myChart = new Chart("myChart", {
        
        type: 'horizontalBar',
        
        data: {
          
          labels: ['Medicine', 'Clothes', 'Food', 'Household'],
          datasets: [{
            
            label: 'Quantity',
            data: [this.numOfMed, this.numOfClothes, this.numOfFood, this.numOfHouse],
            
            backgroundColor: [
              'rgba(29, 41, 81, 0.2)',
              'rgba(0, 142 , 204, 0.2)',
              'rgba(0, 128, 129, 0.2)',
              'rgba(126, 249, 255, 0.2)',
            ],

            borderColor: [
              'rgba(29, 41, 81, 1)',
              'rgba(0, 142 , 204, 1)',
              'rgba(0, 128, 129, 1)',
              'rgba(126, 249, 255, 1)',
            ],

            borderWidth: 1,
            hoverBorderWidth: 3,
            
          }],

        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          animation:{
            easing: 'easeOutQuint', 
            duration: 2000,
          }
        }

      });
    
    })

  }

}
