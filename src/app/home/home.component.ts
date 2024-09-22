import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoryComponent } from '../category/category.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { LoginComponent } from '../login/login.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ProductListComponent,
    LoginComponent,
    UserRegistrationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('productList') productList!: ProductListComponent;
constructor(private apiCallService:ApiCallService){}
  onCategorySelected(category: string): void {
    console.log('Selected category in HomeComponent:', category);
    
    if (category) {
      this.productList.onCategorySelected(category);
    } else {
      this.apiCallService.getRecentProducts();
    }
  }
}
