//Imported from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Imported services
import { FirebaseService } from 'src/app/shared/firebase.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';

//Product information to display interface
export interface ProductRow {
  name: string;
  category: string;
  quantity: number;
  createdBy: string;
}

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})

export class ViewProductsComponent implements OnInit {

  //Initialising varible types
  roleAdmin: boolean;
  tableRows: ProductRow[];

  constructor(private fireBase: FirebaseService, private route: Router, private user: UserService, private productService: ProductsService) { }

  /**
   * Method on initialisation of viewing products
   */
  ngOnInit(): void {
    this.productService.onLoad();
    this.tableRows = this.productService.tableRows;
    this.roleAdmin = this.user.isAdmin;
  }

  /**
   * Method to delete product from Firebase and locally stored array
   * @param productName is name of product to be deleted
   */
  onDeleteProduct(productName: string) {
    
    this.productService.onDelete(productName);
    this.tableRows = this.productService.tableRows;  

    const request = this.fireBase.deleteProduct(productName);
    request.subscribe(response => {
      this.route.navigate(['/viewproducts'])
    });

  }

}