//Imported from Angular
import { Injectable } from '@angular/core';

//Imported service
import { FirebaseService } from './firebase.service';

//Imported interfaces
import { ProductDetails } from '../components/products/add-product/add-product.component';
import { ProductRow } from '../components/products/view-products/view-products.component';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  //List of all products for a session
  tableRows: ProductRow[];

  constructor(private firebase: FirebaseService) { }

  /**
   * Method executed when first loading the view products page
   */
  onLoad() {
    
    //Initialising variable values (empty)
    this.tableRows = [{ name: '', category: '', quantity: null, createdBy: '' }];
    
    //Variable to be used to fill array
    var i = 0;

    //Receives all products from Firebase
    const request = this.firebase.getAllProducts();

    request.subscribe(response => {
      Object.keys(response).forEach(entry => {
        const product = response[entry];
        this.tableRows[i] = { name: product.name, category: product.category, quantity: product.quantity, createdBy: product.createdBy };
        i++;
      })
    })

  }

  /**
   * Method to add a new product to the list of all products
   * @param product contains all details about the product to be added
   */
  onAdd(product: ProductDetails) {
    this.tableRows = [{name: product.name, category: product.category, quantity: product.quantity, createdBy: product.createdBy}];
  }

  /**
   * Method to remove a product from the list of all products
   * @param productName is the name of the product to be removed
   */
  onDelete(productName: string) {
    this.tableRows = this.tableRows.filter(row => row.name !== productName);
  }

}