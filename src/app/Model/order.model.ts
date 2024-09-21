export interface Order {
    id: string;
    orderDate: Date;
    status: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: string;
    billingAddress: string;
    trackingNumber?: string;
    shippedDate?: Date;
    deliveredDate?: Date;
    userId: string;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    discountApplied: number;
    subtotal: number;
  }