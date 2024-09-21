import { Injectable } from '@angular/core';
import { CartItem } from './CartItem.Model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }

  addToCart(item: CartItem): void {
    this.cartItems.push(item);
  }
  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
}
