import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { WindowRefService } from './window.service';
import { Token } from '@angular/compiler';
import { Login } from '../Model/login.module';
import { JwtPayload } from '../Model/jwtPayload/jwtPayload.module';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtPayload:JwtPayload = new JwtPayload();
  constructor(private _httpService:HttpClient,private _route:Router,private windowRef: WindowRefService) { }
  
  login(login:Login):Observable<any> {
    return this._httpService.post("https://localhost:7212/api/Login",login);
  }

  decodeToken():JwtPayload
    {
      const token = window.localStorage.getItem('token');
      if(token!=null)
      {
        this.jwtPayload = this.decodeJwt(token);
      }
      return this.jwtPayload;
    }
     decodeJwt(token: string): any {
     
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
  }

  clearAll(): void {
    window.localStorage.clear();
  }

  getTokenExpirationDate(): Date{
    const decodedToken = this.decodeToken();
    if(decodedToken){
      const date = new Date();
      date.setUTCSeconds(decodedToken.exp);
      return date;
    }
    else{
      return new Date();
    }
  }

  isTokenExpired():boolean{
    const tokenExpirationDate = this.getTokenExpirationDate()
    if(tokenExpirationDate)
    {
      return !(tokenExpirationDate.valueOf()>new Date().valueOf());
    }
    else
    {
      return false;
    }
  }
  logout(){
    const window = this.windowRef.nativeWindow;
    window.localStorage.clear();
    this._route.navigateByUrl("");
  }

   // New: Get the current user's role from the JWT token
   getUserRole(): string | null {
    const token = window.localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeJwt(token);
      return decodedToken.Role || null;  // Assuming the JWT contains a 'role' field
    }
    return null;
  }

  // New: Check if the user is an Admin
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin';
  }

  // New: Check if the user is a Customer
  isCustomer(): boolean {
    const role = this.getUserRole();
    return role === 'Customer';
  }

  // New: Check if the user is a basic User
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'User';
  }

  // New: Check if the user is authenticated (has a valid, non-expired token)
  isAuthenticated(): boolean {
    const token = window.localStorage.getItem('token');
    return token != null && !this.isTokenExpired();
  }
}
