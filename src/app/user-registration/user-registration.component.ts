import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistration } from '../Model/UserRegistration.Model';
import { Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  isSubmitting = false;
  userRegistrationForm = this.formBuilder.group({
    FirstName: [''],
    LastName: [''],
    Email: [''],
    Username: [''],
    PasswordHash: [''],
    PhoneNumber: [''],
    Address: [''],
    BirthDate: [''],
    Role: ['']
  });
  selectedFile: File | null = null;
  constructor(private apicallService: ApiCallService, private router: Router, private formBuilder: FormBuilder) {}
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.isSubmitting) return; // Prevent multiple submissions
    this.isSubmitting = true;
      const formData = new FormData();
  
      // Append all form fields to the FormData object
      formData.append('FirstName', this.userRegistrationForm.get('FirstName')?.value ?? '');
      formData.append('LastName', this.userRegistrationForm.get('LastName')?.value ?? '');
      formData.append('Email', this.userRegistrationForm.get('Email')?.value ?? '');
      formData.append('Username', this.userRegistrationForm.get('Username')?.value ?? '');
      formData.append('PasswordHash', this.userRegistrationForm.get('PasswordHash')?.value ?? '');
      formData.append('PhoneNumber', this.userRegistrationForm.get('PhoneNumber')?.value ?? '');
      formData.append('Address', this.userRegistrationForm.get('Address')?.value ?? '');
      formData.append('BirthDate', this.userRegistrationForm.get('BirthDate')?.value ?? '');
      formData.append('Role', this.userRegistrationForm.get('Role')?.value ?? '');
  
  
      // Append the selected profile image, if available
      if (this.selectedFile) {
        formData.append('ProfileImageUrl', this.selectedFile, this.selectedFile.name);  // Append file here
      }
  
      // Call the API to register the user using your ApiCallService
      this.apicallService.addUser(formData).subscribe(
        (res) => {
          alert("Registered Successfully");
          this.router.navigateByUrl(""); // Redirect after successful registration
          this.isSubmitting = false; // Reset flag
        },
        (err) => {
          console.error("Error during registration:", err);
          alert("An error occurred while registering the user. Please try again.");
          this.isSubmitting = false; // Reset flag
        }
      );
    }
  }