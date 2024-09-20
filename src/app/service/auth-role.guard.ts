import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if (token) {
      const userRole = this.authService.decodeToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];// Adjust this based on your token structure

      if (userRole == expectedRole) {
        return true; // Allow access
      }
    }

    // If the role does not match or no token, redirect to a different route
    this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or login
    return false; // Deny access
  }
}