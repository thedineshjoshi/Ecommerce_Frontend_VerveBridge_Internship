import { Component } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../Model/CartItem.Model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  constructor(private cartService: ApiCallService, private authservice:AuthService) {}
  ngOnInit(): void {
    this.loadCart();
  }

  // Fetch cart items from the backend
  loadCart(): void {
    this.cartService.getCart(this.authservice.decodeToken().UserId).subscribe(
      (response) => {
        this.cartItems = response.cartItems;
        this.totalPrice = response.totalPrice;
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
}
updateQuantity(productId: string, quantity: number): void {
  if (quantity > 0) {
    this.cartService.updateCartItem(this.authservice.decodeToken().UserId, productId, quantity).subscribe(() => {
      this.loadCart();
    });
  }
}

removeItem(productId: string): void {
  this.cartService.removeFromCart(this.authservice.decodeToken().UserId, productId).subscribe(() => {
    this.loadCart();
  });
}
}
