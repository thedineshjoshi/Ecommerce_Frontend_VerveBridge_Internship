import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private router: Router) {}

  ngOnInit() {
    // Check if token exists in local storage
    this.isLoggedIn = !!localStorage.getItem('token');
  }
  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
