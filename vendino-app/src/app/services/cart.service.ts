import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // ✅ Makes the service available app-wide
})
export class CartService {
  private cart: any[] = [];
  private totalPrice: number = 0;

  constructor() {}

  getCart() {
    return this.cart; // ✅ Returns the current cart state
  }

  getTotalPrice() {
    return this.totalPrice; // ✅ Returns total price
  }

  getTotalItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  addToCart(item: any) {
    let cartItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.calculateTotal();
  }

  getItemQuantity(item: any): number {
    let cartItem = this.cart.find(cartItem => cartItem.name === item.name);
    return cartItem ? cartItem.quantity : 0;
  }  

  clearCart() {
    this.cart = [];
    this.totalPrice = 0;
  }

  updateCart(updatedCart: any[], updatedTotal: number) {
    this.cart = updatedCart; // ✅ Save new cart items
    this.totalPrice = updatedTotal; // ✅ Save updated price
  }  

  private calculateTotal() {
    this.totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
