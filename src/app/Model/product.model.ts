// src/app/model/product.model.ts
export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageUrl?: string;
    sku: string;
    weight: number;
    dimensions: string;
    category: string;
    brand: string;
    discount: number;
    isFeatured: boolean;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  