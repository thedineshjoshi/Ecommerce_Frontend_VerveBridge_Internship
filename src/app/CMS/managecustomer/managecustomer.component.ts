import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiCallService } from '../../service/api-call.service';
import { CommonModule } from '@angular/common';
import { CustomerDto } from '../../Model/Customer.Dto';

@Component({
  selector: 'app-managecustomer',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './managecustomer.component.html',
  styleUrl: './managecustomer.component.css'
})
export class ManagecustomerComponent {
  customers: any[] = [];

  constructor(private userService: ApiCallService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.userService.getCustomers().subscribe(
      (data: CustomerDto[]) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers', error);
      }
    );
  }


  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.loadCustomers(); // Refresh the customer list
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}
