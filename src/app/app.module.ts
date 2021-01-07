//Imported from Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Imported from app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Imported components
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/universal_components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/universal_components/footer/footer.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ViewProductsComponent } from './components/products/view-products/view-products.component';
import { AdminChartComponent } from './components/admin-chart/admin-chart.component';

@NgModule({

  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent,
    AddProductComponent,
    ViewProductsComponent,
    AdminChartComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }
