import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../Model/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  shippingAddress: string = '';
  billingAddress: string = '';
  paymentMethod: string = 'Credit Card';
  totalAmount: number = 0;

  constructor(
    private checkoutService: ApiCallService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this,this.checkoutService.getCartItems(this.authService.decodeToken().UserId)); // Check the contents of cartItems
   this.totalAmount = this.cartService.getTotalAmount();
   console.log(this.totalAmount); // Check the calculated totalAmount
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
        alert('Checkout successful!');
        this.router.navigate(['/order-success']);
      },
      error: (error) => {
        console.error('Checkout error:', error);
        alert('Checkout failed, please try again.');
      }
    });
  }
}
