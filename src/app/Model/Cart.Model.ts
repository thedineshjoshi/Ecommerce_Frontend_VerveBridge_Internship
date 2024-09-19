import { CartItem } from "./CartItem.Model";

export interface Cart {
    id: string;
    userId: string;
    isActive: boolean;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
    cartItems: CartItem[];
  }