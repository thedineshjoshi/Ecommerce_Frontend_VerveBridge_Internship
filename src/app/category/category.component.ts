import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] // note: it should be "styleUrls" instead of "styleUrl"
})
export class CategoryComponent {
  @Output() categorySelected = new EventEmitter<string>(); // Emit category as a string

  categories = [
    { name: 'Electronics', icon: 'fas fa-tv' },
    { name: 'Fashion', icon: 'fas fa-tshirt' },
    { name: 'Home & Living', icon: 'fas fa-couch' },
    { name: 'Beauty', icon: 'fas fa-spa' }
  ];

  selectCategory(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (!category) {
      this.categorySelected.emit(''); // Empty string indicates no category selected
    } else {
      this.categorySelected.emit(category);
    }
  }
}
