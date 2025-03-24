import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge classnames with tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to format price as currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Cart item interface
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
}

// Local storage key for cart
export const CART_STORAGE_KEY = "ecommerce-cart"; 