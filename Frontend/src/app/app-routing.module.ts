import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  {path:'products',component:ProductsComponent,canActivate:[AuthguardService]},
  {path:'',component:LoginComponent},
  {path:'payment',component:PaymentComponent,canActivate:[AuthguardService]},
  {path:'cart',component:CartComponent,canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
