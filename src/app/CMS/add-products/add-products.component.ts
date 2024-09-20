import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiCallService } from '../../service/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ApiCallService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      StockQuantity: ['', [Validators.required, Validators.min(0)]],
      SKU: ['', Validators.required],
      Weight: ['', [Validators.required, Validators.min(0)]],
      Dimensions: ['', Validators.required],
      Category: ['', Validators.required],
      Brand: ['', Validators.required],
      Discount: [''],
      IsFeatured: [false],
      Tags: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(this.productForm.controls).forEach(key => {
      formData.append(key, this.productForm.get(key)?.value ?? '');
    });
  
    // Append the selected file if present
    if (this.selectedFile) {
      formData.append('ImageUrl', this.selectedFile, this.selectedFile.name);
    }
  
    this.productService.addProduct(formData).subscribe(
      response => {
        alert('Product added successfully!');
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        console.error('Error adding product:', error);
        alert('An error occurred while adding the product. Please try again.');
      }
    );
  }
}
