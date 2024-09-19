export interface CartItem {
    id: string;
    productId: string;
    productName: string;
    unitPrice: number;
    discountApplied: number;
    quantity: number;
    totalPrice: number;
    imageUrl?: string;
  }