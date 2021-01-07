//Imported from Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Imported components
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component'
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ViewProductsComponent } from './components/products/view-products/view-products.component';

//Imported services
import { GuestGuard } from './shared/guards/guest.guard';
import { LoginGuardGuard } from './shared/guards/login-guard.guard'
import { AdminChartComponent } from './components/admin-chart/admin-chart.component';

//Route creation with guards
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'signup', component: RegistrationComponent, canActivate: [GuestGuard]}, 
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuardGuard]},
  {path: 'addproduct', component: AddProductComponent, canActivate: [LoginGuardGuard]},
  {path: 'viewproducts', component: ViewProductsComponent, canActivate: [LoginGuardGuard]},
  {path: 'adminchart', component: AdminChartComponent, canActivate: [LoginGuardGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
