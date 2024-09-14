import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerSectionComponent } from '../banner-section/banner-section.component';
import { CategoryComponent } from '../category/category.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { LoginComponent } from '../login/login.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BannerSectionComponent,
    CategoryComponent,
    ProductListComponent,
    LoginComponent,
    UserRegistrationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
