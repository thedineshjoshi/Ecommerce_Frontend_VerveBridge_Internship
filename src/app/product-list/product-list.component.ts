import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/product.model';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  product: Product| undefined;;
  recentProducts: Product[] = [];
  quantity: number = 1;
  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _apiCallService: ApiCallService,
    private authService:AuthService
  ){}

  ngOnInit(): void {

    this.fetchRecentProducts();
  }
  
  // Fetch recent products from the backend
  fetchRecentProducts():void  {
    this._apiCallService.getRecentProducts().subscribe((products: Product[]) => {
      this.recentProducts = products;
    });
  }
  addToCart(productId: string | undefined, quantity: number): void {
  if (productId) {
    
    this._apiCallService.addToCart(this.authService.decodeToken().UserId, productId, this.quantity)
      .subscribe(
        response => {
          console.log('Product added to cart:', response);
          this.showMessage = true;

          // Hide the message after 10 seconds
          setTimeout(() => {
          this.showMessage = false;
            }, 5000); // 10 seconds
        },
        error => {
          console.error('Error adding to cart:', error);
        }
      );
  } else {
    console.error('Product ID is undefined');
  }
}
}
