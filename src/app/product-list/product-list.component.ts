import { Component } from '@angular/core';
import { Product } from '../Model/product.model';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  recentProducts: Product[] = []; // Array to hold recent products

  constructor(private productService: ApiCallService) { }

  ngOnInit(): void {
    this.fetchRecentProducts();
  }

  // Fetch recent products from the backend
  fetchRecentProducts(): void {
    this.productService.getRecentProducts().subscribe((products: Product[]) => {
      this.recentProducts = products;
    });
  }

}
