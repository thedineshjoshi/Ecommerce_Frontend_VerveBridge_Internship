import { Component } from '@angular/core';
import { ApiCallService } from '../service/api-call.service';
import { User } from '../Model/User.Model';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;

  constructor(private apiCallService: ApiCallService,private authservice:AuthService) {}

  ngOnInit() {
    const userId = this.authservice.decodeToken().UserId;
    if (userId) {
      this.apiCallService.getUserProfile(userId).subscribe(
        data => {
          this.user = data;
          console.log('User data:', this.user);


        },
        error => console.error('Error fetching user profile', error)
      );
    }
  }
  }
