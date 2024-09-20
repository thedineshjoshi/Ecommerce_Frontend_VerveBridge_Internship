import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UserRegistration } from '../Model/UserRegistration.Model';
import { Cart } from '../Model/Cart.Model';
import { Product } from '../Model/product.model';
import { CartItem } from '../Model/CartItem.Model';
import { CustomerDto } from '../Model/Customer.Dto';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private cart: any[] = [];
  private userRegistrationApiUrl = 'https://localhost:7212/api/UserRegistration'; // Blog API URL
  private productApiUrl='https://localhost:7212/api/Product';
  private cartApiUrl='https://localhost:7212/api/Cart';

  constructor(private http: HttpClient) {}

  addUser(formData:FormData):Observable<any>
  {
    return this.http.post(`${this.userRegistrationApiUrl}/Register`,formData);
  }

  addProduct(product: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.productApiUrl, product,{ headers });
  }

  getRecentProducts(): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/recent`); // Fetch recent products
  }
  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/${productId}`);
  }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartApiUrl}/${userId}`);
  }

  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.cartApiUrl}/${userId}`);
  }
  addToCart(userId: string, productId: string, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartApiUrl}/${userId}/cart/${productId}?quantity=${quantity}`, { userId, productId, quantity });
  }

  removeFromCart(userId: string, productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.cartApiUrl}/RemoveProduct?userId=${userId}&productId=${productId}`);
  }

  updateCartItem(userId: string, productId: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.cartApiUrl}/${userId}/cart/${productId}`, null, {
      params: { quantity: quantity.toString() }
    });
  }

  getCustomers(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this.userRegistrationApiUrl}/Customers`);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.userRegistrationApiUrl}/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT tokens
      })
    });
  }
}