import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../Model/cart.service';
import { CartItem } from '../Model/CartItem.Model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingAddress: string = '';
  billingAddress: string = '';
  paymentMethod: string = 'Credit Card';
  totalPrice: number = 0;
  showMessage: boolean = false;

  constructor(
    private checkoutService: ApiCallService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.decodeToken().UserId;
    this.checkoutService.getCartItems(userId).subscribe({
      next: (cartResponse: any) => {
        console.log('Cart items response:', cartResponse); // Inspect the full cart object
  
        // Access the 'cartItems' property in the cart response
        if (cartResponse && cartResponse.cartItems && Array.isArray(cartResponse.cartItems)) {
          this.cartItems = cartResponse.cartItems; // Assign cart items to the component's array
        } else {
          this.cartItems = []; // If no items, set cartItems to an empty array
          alert('Your cart is empty!');
        }
  
        // Calculate total amount if there are items
        if (this.cartItems.length > 0) {
          this.calculateTotalAmount();
        }
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      }
    });
  }
  
  
  
  

  onSubmitCheckout(): void {
    const userId = this.authService.decodeToken().UserId;
    
    const orderData = {
      userId: userId,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      paymentMethod: this.paymentMethod
    };

    this.checkoutService.checkout(orderData).subscribe({
      next: (order) => {
        this.showMessage = true;
          setTimeout(() => {
          this.showMessage = false;
            }, 5000);
      },
      error: (error) => {
        console.error('Checkout error:', error);
        alert('Checkout failed, please try again.');
      }
    });
  }
  calculateTotalPriceAfterDiscount(): number {
    return this.cartItems.reduce((total, item) => {
      const discountedPrice = item.unitPrice - (item.unitPrice * item.discountApplied / 100);
      return total + discountedPrice * item.quantity;
    }, 0);}
  calculateTotalAmount(): void {
    if (Array.isArray(this.cartItems)) {
      this.totalPrice = this.cartItems.reduce(
        (sum, item) => sum + (item.unitPrice * item.quantity),
        0
      );
    }
  }
}
