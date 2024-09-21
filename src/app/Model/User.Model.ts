// user.model.ts
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string; // e.g., Customer, Admin
    phoneNumber: string;
    profileImageUrl: string;
    address: string;
    dateOfBirth: string; // ISO date string
    isVerified: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
