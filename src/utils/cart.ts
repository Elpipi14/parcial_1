import type { Product } from "../types/products";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_KEY = "food-store-cart";

export function getCart(): CartItem[] {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as CartItem[];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity = 1): void {
  if (!product.available || product.stock <= 0) return;

  const normalizedQuantity = Math.max(1, quantity);
  const cart = getCart();

  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += normalizedQuantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: normalizedQuantity,
      image: product.image,
    });
  }

  saveCart(cart);
}

export function updateCartItemQuantity(productId: number, quantity: number): void {
  const cart = getCart();

  if (quantity <= 0) {
    saveCart(cart.filter((item) => item.productId !== productId));
    return;
  }

  const item = cart.find((cartItem) => cartItem.productId === productId);
  if (!item) return;

  item.quantity = quantity;
  saveCart(cart);
}

export function removeFromCart(productId: number): void {
  saveCart(getCart().filter((item) => item.productId !== productId));
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

export function calculateCartTotal(cart: CartItem[] = getCart()): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemsCount(cart: CartItem[] = getCart()): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}