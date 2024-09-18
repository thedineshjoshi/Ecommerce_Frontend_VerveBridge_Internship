import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserRegistration } from '../Model/UserRegistration.Model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private userRegistrationApiUrl = 'https://localhost:7212/api/UserRegistration'; // Blog API URL
  private productApiUrl='https://localhost:7212/api/Product';
  private loginUrl = 'https://localhost:7212/api/Login';
 
  constructor(private http: HttpClient) {}
  //UserApis
  addUser(formData:FormData):Observable<any>
  {
    return this.http.post<any>(`${this.userRegistrationApiUrl}/Register`,formData,{responseType:'json'});
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
  login():Observable<any>
  {
    return this.http.post<any>(this.loginUrl,{responseType:'json'});
  }
}
