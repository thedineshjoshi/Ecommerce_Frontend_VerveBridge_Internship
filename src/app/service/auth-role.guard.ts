import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: any): boolean {
    const expectedRole = route.data.expectedRole;
    
    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }

    // Check user role
    const currentRole = this.authService.getUserRole();
    if (currentRole && currentRole === expectedRole) {
      return true;
    }

    // Redirect if user does not have the appropriate role
    this.router.navigate(['/unauthorized']);
    return false;
  }
}