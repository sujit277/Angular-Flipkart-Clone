import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AuthguardService } from './service/authguard.service';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent /* canActivate:[AuthguardService] */,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'payment',
    component: PaymentComponent /* canActivate:[AuthguardService] */,
  },
  {
    path: 'cart',
    component: CartComponent /* canActivate:[AuthguardService] */,
  },
  { path: 'product/:id', component: ProductdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
