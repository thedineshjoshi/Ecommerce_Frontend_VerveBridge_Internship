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

// import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
// import { debounceTime, switchMap } from 'rxjs/operators';
// import { Product } from '../Model/product.model';
// import { ApiCallService } from '../service/api-call.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../service/auth.service';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   private addToCartSubject = new Subject<{ productId: string, quantity: number }>();
//   recentProducts: Product[] = [];
//   quantity: number = 1;
//   loading = false;

//   constructor(
//     private _apiCallService: ApiCallService,
//     private authService: AuthService
//   ) {
//     this.addToCartSubject.pipe(
//       debounceTime(300), // Wait 300ms after the last event before emitting
//       switchMap(({ productId, quantity }) => {
//         const userId = this.authService.decodeToken().UserId;
//         if (!userId) {
//           console.error('User not authenticated');
//           return [];
//         }
//         this.loading = true;
//         return this._apiCallService.addToCart(userId, productId, quantity);
//       })
//     ).subscribe({
//       next: response => {
//         this.loading = false;
//         console.log('Product added to cart:', response);
//         // Optionally show a success message
//       },
//       error: err => {
//         this.loading = false;
//         console.error('Error adding to cart:', err);
//         // Optionally show an error message
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.fetchRecentProducts();
//   }

//   fetchRecentProducts(): void {
//     this._apiCallService.getRecentProducts().subscribe({
//       next: (products: Product[]) => {
//         this.recentProducts = products;
//       },
//       error: err => {
//         console.error('Error fetching recent products:', err);
//       }
//     });
//   }

//   addToCart(productId: string | undefined, quantity: number): void {
//     if (productId) {
//       this.addToCartSubject.next({ productId, quantity });
//     } else {
//       console.error('Product ID is undefined');
//     }
//   }
// }
