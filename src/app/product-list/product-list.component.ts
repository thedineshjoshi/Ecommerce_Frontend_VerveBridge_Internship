import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/product.model';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] // Note the correction here to "styleUrls"
})
export class ProductListComponent implements OnInit {
  product: Product | undefined;
  recentProducts: Product[] = [];
  filteredProducts: Product[] = []; // New property for filtered products
  quantity: number = 1;
  showMessage: boolean = false;
  selectedCategory: string = ''; // New property for selected category

  constructor(
    private _apiCallService: ApiCallService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  
  // Fetch recent products from the backend
  // fetchRecentProducts(): void {
  //   this._apiCallService.getRecentProducts().subscribe((products: Product[]) => {
  //     this.recentProducts = products;
  //     this.filteredProducts = products; // Initialize filteredProducts with all products
  //   });
  // }

  // Method to handle category selection
  onCategorySelected(category: string): void {
    this.selectedCategory = category; // Save the selected category
    if(category=="All")
    {
      this.getAllProducts();
    }
    else
    {
    this._apiCallService.getProductsByCategory(category).subscribe(
      (products) => {
        this.filteredProducts = products; // Directly update the filteredProducts array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  }
  getAllProducts(): void {
    this._apiCallService.getRecentProducts().subscribe(
      (products) => {
        this.recentProducts = products;
        this.filteredProducts = products; // Initially, all products are shown
      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }

  // Filter products based on the selected category
  filterProducts(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.recentProducts.filter(product =>
        product.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.recentProducts; // Show all products if no category is selected
    }
  }

  addToCart(productId: string | undefined, quantity: number): void {
    if (productId) {
      this._apiCallService.addToCart(this.authService.decodeToken().UserId, productId, this.quantity)
        .subscribe(
          response => {
            console.log('Product added to cart:', response);
            this.showMessage = true;

            // Hide the message after 5 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 5000);
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
