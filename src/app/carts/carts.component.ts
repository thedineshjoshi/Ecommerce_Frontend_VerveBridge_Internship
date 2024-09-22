import { Component } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../Model/CartItem.Model';
import { AuthService } from '../service/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cart } from '../Model/Cart.Model';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FormsModule,RouterLink],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  cart:Cart[]=[];
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
updateQuantity(productId: string, newQuantity: number): void {
  if (newQuantity < 1) {
    return;
  }

  this.cartService.updateCartItem(this.authservice.decodeToken().UserId, productId, newQuantity).subscribe(
    () => {
      const item = this.cartItems.find(i => i.productId === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    (error) => {
      console.error('Error updating quantity:', error);
    }
  );
}
updateCartItem(productId: string, quantity: number) {
  this.cartService.updateCartItem(this.authservice.decodeToken().UserId, productId, quantity).subscribe(
    (response) => {
      console.log('Cart item updated:', response);
      this.loadCart();
    },
    (error) => {
      console.error('Error updating cart item:', error);
    }
  );
}

onQuantityChange(item: CartItem): void {
  if (item.quantity < 1) {
    item.quantity = 1; 
  }
  this.updateQuantity(item.productId, item.quantity);
}

removeItem(productId: string): void {
  this.cartService.removeFromCart(this.authservice.decodeToken().UserId, productId).subscribe(() => {
    this.loadCart();
  });
}

removeProductFromCart(productId: string) {
  this.cartService.removeFromCart(this.authservice.decodeToken().UserId, productId).subscribe(
    (response) => {
      console.log('Product removed from cart:', response);
      this.loadCart(); 
    },
    (error) => {
      console.error('Error removing product from cart:', error);
    }
  );
}
calculateTotalPriceAfterDiscount(): number {
  return this.cartItems.reduce((total, item) => {
    const discountedPrice = item.unitPrice - (item.unitPrice * item.discountApplied / 100);
    return total + discountedPrice * item.quantity;
  }, 0);}
  calculateDiscountedPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const discountedPrice = item.unitPrice - (item.unitPrice * item.discountApplied / 100);
      return discountedPrice;
    }, 0);}
  

checkout(): void {
  alert('Proceeding to checkout!');
}
}
