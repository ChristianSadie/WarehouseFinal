//Imported from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Imported service
import { FirebaseService } from 'src/app/shared/firebase.service';
import { ProductsService } from 'src/app/shared/products.service';

//Product information interface
export interface ProductDetails {
  name: string,
  category: string,
  quantity: number,
  createdOn: Date,
  updatedOn: Date, 
  createdBy: string,
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

  //Initialising variable types
  product: ProductDetails;

  constructor(public firebase : FirebaseService, public route : Router, private productService: ProductsService) { }

  ngOnInit(): void {
    
    //Initialising the variable values (empty)
    this.product = {
      name: '',
      category: '',
      quantity: null,
      createdOn: null, 
      updatedOn: null, 
      createdBy: window.localStorage.username,
    }

  }

  /**
   * Method to add a new product to Firebase and the locally stored array
   */
  onAdd() {

    //Validation: name
    if (this.product.name === '') {
      alert("Please enter product name");
      return;
    }

    //Validation: name
    if (this.product.name[0] !== this.product.name[0].toUpperCase()) {
      alert("Please capitalise product name");
      return;
    }

    //Validation: category
    if (this.product.category === '') {
      alert("Please choose product category");
      return;
    }

    //Validation: quantity
    if (this.product.quantity === null) {
      alert("Please enter product quantity");
      return;
    }

    //Validation: quantity
    if (this.product.quantity < 1) {
      alert("Please enter valid quantity");
      return;
    }

    //Validation: quantity
    if (this.product.quantity > 100) {
      alert("Please enter valid quantity");
      return;
    }

    //Adding the product to Firebase, and the array, and the navigating
    this.product.createdOn = new Date();
    this.productService.onAdd(this.product);
    
    const request = this.firebase.addProduct(this.product);
    request.subscribe(response => {
      alert("Product added")
      this.route.navigate(['/viewproducts']);
    });
  
  }
  
}