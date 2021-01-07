import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from '../components/products/add-product/add-product.component';
import { RegistrationDetails } from '../components/registration/registration.component';
export const FIREBASE_URL = "https://warehouse-60711-default-rtdb.europe-west1.firebasedatabase.app/";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private http: HttpClient) { }

  pass1: string;

  //-----------------------------------------------------------------------------------------------------------
  //REGISTRATION AND LOGIN
  //-----------------------------------------------------------------------------------------------------------

  /**
   * Adding a new user to Firebase
   * @param username is the user's username
   * @param reg is all information about a new user
   */
  createUser(username: string, reg: RegistrationDetails) {
    return this.http.put(FIREBASE_URL + "users/" + username + ".json", reg);
  }

  /**
   * Receiving all information about a user from Firebase
   * @param username is the username of the user
   */
  checkUsername(username: string) {
    return this.http.get(FIREBASE_URL + "users/" + username + ".json");
  }

  /**
   * Reveives user's password from Firebase
   * @param username is user's username
   */
  userPassword(username: string) {
    return this.http.get(FIREBASE_URL + "users/" + username + "/password.json");
  }

  /**
   * Updates an existing user
   * @param username is user's username
   * @param user is any information about the user
   */
  updateUser(username: string, user: any) {
    return this.http.patch(FIREBASE_URL + "users/" + username + ".json", user);
  }

  /**
   * Receives all users from Firebase
   */
  getAllUsers() {
    return this.http.get(FIREBASE_URL + "users.json");
  }

  //-----------------------------------------------------------------------------------------------------------
  //PRODUCTS
  //-----------------------------------------------------------------------------------------------------------

  /**
   * Adds a new product to Firebase
   * @param product is all information about the product
   */
  addProduct(product: ProductDetails) {
    return this.http.put(FIREBASE_URL + "products/" + product.name + ".json", product);
  }

  
  /**
   * Removes a product from Firebase
   * @param productName is the product's name
   */
  deleteProduct(productName: string) {
    return this.http.delete(FIREBASE_URL + "products/" + productName + ".json");
  }
  
  /**
   * Receives all products from Firebase
   */
  getAllProducts() {
    return this.http.get(FIREBASE_URL + "products.json");
  }
  
}
