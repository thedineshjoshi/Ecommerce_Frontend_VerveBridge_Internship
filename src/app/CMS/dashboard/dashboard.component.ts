import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../Model/product.model';
import { ApiCallService } from '../../service/api-call.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
