import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AddProductsComponent } from './CMS/add-products/add-products.component';
import { DashboardComponent } from './CMS/dashboard/dashboard.component';
import { RoleGuard } from './service/auth-role.guard';
import { CartComponent } from './CMS/cart/cart.component';
import { UnauthorizedComponent } from './CMS/unauthorized/unauthorized.component';
import { CartsComponent } from './carts/carts.component';
import { ManagecustomerComponent } from './CMS/managecustomer/managecustomer.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';


export const routes: Routes = [
    {path: '',redirectTo:'/home',pathMatch:'full' },
    {path:'home',component:HomeComponent},
    {path: 'login', component: LoginComponent},
    {path:'userregister',component:UserRegistrationComponent},
    {path: 'carts', component: CartsComponent },
    {path: 'admin/products', component: AddProductsComponent },
    { path: 'checkout', component: CheckoutComponent },
    {path:'dashboard',component:DashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' }},
    {path:'managecustomer',component:ManagecustomerComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' }},
    {path: 'customer/cart', component: CartComponent, canActivate: [RoleGuard], data: { expectedRole: 'Customer' } },
    //{path: 'checkout', component: CheckoutComponent, canActivate: [RoleGuard], data: { expectedRole: 'Customer' } },
    {path: 'user/cart', component: CartComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
    {path:'profile',component:ProfileComponent},
    {path: 'unauthorized', component: UnauthorizedComponent },  // Handle unauthorized access
];
